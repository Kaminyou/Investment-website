import json
import os
from datetime import datetime, timedelta, timezone
from http import HTTPStatus

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt,
                                get_jwt_identity, jwt_required,
                                unset_jwt_cookies)
from marshmallow import ValidationError

from db import db
from models import (UserModel, DonationModel)
from schemas import (UserSchema, DonationSchema)
from security import get_sha256
from utils.parser import parse_user_instances, parse_personal_donation

donationSchema = DonationSchema()
userSchema = UserSchema()
result_dir_root = os.environ.get("RESULT_DIR", "./results/")
admin_account = os.environ.get("ADMIN_ACCOUNT", "root")

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'SQLALCHEMY_DATABASE_URI',
    default="mysql+pymysql://root:kaminyou@db:3306/spark",
)
jwt = JWTManager(app)
CORS(app)
db.init_app(app)

MAX_INVESTMENT = 1000000


@app.before_first_request
def create_tables():
    db.create_all()


@app.route('/api/token', methods=["POST"])
def create_token():
    '''
    Log in with account and password.
    If the user is authenticated, return the jwt token.
    '''
    try:
        account = request.json.get("account", None)
        password = request.json.get("password", None)

        if not UserModel.find_by_account(account=account):
            return {"msg": "Wrong account or password"}, 401
        user_instance = UserModel.find_by_account(account=account)
        password_hash = user_instance.__dict__['password']
        if get_sha256(password) != password_hash:
            return {"msg": "Wrong account or password"}, 401

        access_token = create_access_token(identity=account)
        response = {"msg": "Success", "access_token": access_token}
        return response
    except Exception as e:
        print(e)
        return {"msg": "Wrong account or password"}, 401


@app.route("/api/logout", methods=["POST"])
def logout():
    '''
    Log out API
    '''
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route("/api/validate", methods=["POST"])
@jwt_required()
def validate_token():
    '''
    Check if the given user and jwt token are all authenticated.
    '''
    try:
        account = get_jwt_identity()
        if not UserModel.find_by_account(account=account):
            return {"msg": "Wrong account or password"}, HTTPStatus.FORBIDDEN

        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            return {"msg": "Timeout"}, HTTPStatus.FORBIDDEN

        return {"msg": "Success"}, HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"msg": "Invalid"}, HTTPStatus.FORBIDDEN


@app.after_request
def refresh_expiring_jwts(response):
    '''
    Refresh the expired jwt token.
    '''
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route('/api/submit/donation', methods=['POST'])
@jwt_required()
def submit_crop_request():
    '''
    API to receive the donation request.
    '''
    try:
        mapping_dict = {
            1: 'group_one',
            2: 'group_two',
            3: 'group_three',
            4: 'group_four',
            5: 'group_five',
            6: 'group_six',
            7: 'group_seven',
            9: 'group_nine',
            10: 'group_ten',
            11: 'group_eleven',
            12: 'group_twelve',
            13: 'group_thirteen'
        }

        account = get_jwt_identity()
        user_obj = UserModel.find_by_account(account=account)
        group = user_obj.__dict__['category']

        formData = donationSchema.load(request.form)
        formData.update({"account": account})

        if group in mapping_dict:
            formData[mapping_dict[group]] = 0

        accum = 0
        for k, v in formData.items():
            if 'group' in k:
                accum += v
        if accum > MAX_INVESTMENT:
            return {"message": f"Over {MAX_INVESTMENT}"}, HTTPStatus.FORBIDDEN
        crop_request_obj = DonationModel(**formData)

        crop_request_obj.save_to_db()

        try:

            return jsonify({"msg": "Submit successfully!", "task_id": crop_request_obj.submitUUID}), HTTPStatus.OK

        except Exception:
            crop_request_obj.delete_from_db()  # Rollback
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    except ValidationError as e:
        print(e)
        return jsonify({"msg": "ERROR"}), HTTPStatus.BAD_REQUEST

    except Exception as e:
        print(e)
        return jsonify({"msg": "Internal Server Error!"}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/dashboard/donation', methods=['GET'])
@jwt_required()
def get_donation_sum():
    '''
    API to get donation sum
    '''
    try:
        mapping_dict = {
            1: 'group_one',
            2: 'group_two',
            3: 'group_three',
            4: 'group_four',
            5: 'group_five',
            6: 'group_six',
            7: 'group_seven',
            9: 'group_nine',
            10: 'group_ten',
            11: 'group_eleven',
            12: 'group_twelve',
            13: 'group_thirteen'
        }

        cum = {
            'group_one': 0,
            'group_two': 0,
            'group_three': 0,
            'group_four': 0,
            'group_five': 0,
            'group_six': 0,
            'group_seven': 0,
            'group_nine': 0,
            'group_ten': 0,
            'group_eleven': 0,
            'group_twelve': 0,
            'group_thirteen': 0,
        }

        account = get_jwt_identity()

        user_instances = UserModel.find_all_users()
        users = []
        groups = []
        for user_instance in user_instances:
            users.append(user_instance.__dict__['account'])
            groups.append(user_instance.__dict__['category'])

        for user, group in zip(users, groups):
            donation_object = DonationModel.find_latest_by_account(account=user)
            if donation_object is not None:
                res = parse_personal_donation(donation_object)
                for k, v in res.items():
                    if k in cum:
                        cum[k] += v
                    
        data = []
        names = ['group_one', 'group_two', 'group_three', 'group_four', 'group_five', 'group_six', 'group_seven', 'group_nine', 'group_ten', 'group_eleven', 'group_twelve', 'group_thirteen']
        final_names = ['1', '2', '3', '4', '5', '6', '7', '9', '10', '11', '12', '13']
        for name, final_name in zip(names, final_names):
            data.append(
                {
                    'name': final_name,
                    'dollars': cum[name],
                }
            )

        try:

            return jsonify({"msg": "Submit successfully!", "data": data}), HTTPStatus.OK

        except Exception:
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    except ValidationError as e:
        print(e)
        return jsonify({"msg": "ERROR"}), HTTPStatus.BAD_REQUEST

    except Exception as e:
        print(e)
        return jsonify({"msg": "Internal Server Error!"}), HTTPStatus.INTERNAL_SERVER_ERROR
    

@app.route('/api/personal/donation', methods=['GET'])
@jwt_required()
def fetch_personal_donation():
    '''
    API to fetch personal donation.
    '''
    try:
        account = get_jwt_identity()

        donation_object = DonationModel.find_latest_by_account(account=account)

        try:

            return jsonify({"msg": "Submit successfully!", "record": parse_personal_donation(donation_object)}), HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    except ValidationError as e:
        print(e)
        return jsonify({"msg": "ERROR"}), HTTPStatus.BAD_REQUEST

    except Exception as e:
        print(e)
        return jsonify({"msg": "Internal Server Error!"}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/admin/createuser', methods=['POST'])
@jwt_required()
def create_user():
    '''
    Enable admin to create new user.
    '''
    try:
        account = get_jwt_identity()
        if account != admin_account:
            return {"msg": "Not admin"}, HTTPStatus.FORBIDDEN
        new_user_account = request.form["account"]
        if UserModel.find_by_account(account=new_user_account) is not None:
            return {"msg": "Duplicated account"}, HTTPStatus.FORBIDDEN
        formData = userSchema.load(request.form)
        userObj = UserModel(**formData)
        try:
            userObj.save_to_db()

        except Exception:
            userObj.delete_from_db()  # Rollback
            raise ValueError

        return {"msg": "Success"}, HTTPStatus.OK

    except Exception:
        return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/admin/changepwd', methods=['POST'])
@jwt_required()
def change_user_password():
    '''
    Enable admin to change any user's password.
    '''
    try:
        account = get_jwt_identity()
        if account != admin_account:
            return {"msg": "Not admin"}, HTTPStatus.FORBIDDEN
        user_account = request.form["account"]
        new_password = request.form["password"]
        if UserModel.find_by_account(account=user_account) is None:
            return {"msg": "Does not exist"}, HTTPStatus.FORBIDDEN

        try:
            UserModel.reset_password(account=user_account, password=get_sha256(new_password))
        except Exception:
            raise ValueError

        return {"msg": "Success"}, HTTPStatus.OK

    except Exception:
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/admin/listuser', methods=['GET'])
@jwt_required()
def list_current_users():
    '''
    Enable admin to get a list of registered users.
    '''
    try:
        account = get_jwt_identity()
        if account != admin_account:
            return {"msg": "Not admin"}, HTTPStatus.FORBIDDEN

        user_instances = UserModel.find_all_users()
        return {"currentUsers": parse_user_instances(user_instances)}, HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/personal/listuser', methods=['GET'])
@jwt_required()
def list_current_users_personal():
    '''
    Enable self to get a list of him/herself.
    '''
    try:
        account = get_jwt_identity()
        user_instances = UserModel.find_by_account(account=account)
        if not user_instances:
            return {"msg": "Wrong account or password"}, 401
        return {"currentUsers": parse_user_instances([user_instances])}, HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/personal/changepwd', methods=['POST'])
@jwt_required()
def change_user_password_personal():
    '''
    Enable self to change any him/herself password.
    '''
    try:
        account = get_jwt_identity()
        if not UserModel.find_by_account(account=account):
            return {"msg": "Wrong account or password"}, 401
        user_account = request.form["account"]
        new_password = request.form["password"]
        if user_account != account:
            return {"msg": "Not yourself"}, HTTPStatus.FORBIDDEN
        if UserModel.find_by_account(account=user_account) is None:
            return {"msg": "Does not exist"}, HTTPStatus.FORBIDDEN

        try:
            UserModel.reset_password(account=user_account, password=get_sha256(new_password))
        except Exception:
            raise ValueError

        return {"msg": "Success"}, HTTPStatus.OK

    except Exception:
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/admin/verify', methods=['GET'])
@jwt_required()
def is_user_admin():
    '''
    Return if the given account is admin or not.
    '''
    try:
        account = get_jwt_identity()
        if account != admin_account:
            return {"msg": "Not admin", "isAdmin": False}, HTTPStatus.OK
        else:
            return {"msg": "Is admin", "isAdmin": True}, HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/api/version', methods=['GET'])
def get_version():
    '''
    Return the api version
    '''
    try:
        return {"version": "v0.1.0"}, HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


if __name__ == '__main__':
    app.debug = False
    app.run(host="0.0.0.0", port=5000)
