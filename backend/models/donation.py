from db import db


class DonationModel(db.Model):
    __tablename__ = "donation"

    id = db.Column(db.Integer, primary_key=True)
    account = db.Column(db.ForeignKey('users.account'), nullable=False)
    submitUUID = db.Column(db.CHAR(36), nullable=False, unique=True)

    # group
    group_one = db.Column(db.Integer, nullable=False)
    group_two = db.Column(db.Integer, nullable=False)
    group_three = db.Column(db.Integer, nullable=False)
    group_four = db.Column(db.Integer, nullable=False)
    group_five = db.Column(db.Integer, nullable=False)
    group_six = db.Column(db.Integer, nullable=False)
    group_seven = db.Column(db.Integer, nullable=False)
    group_nine = db.Column(db.Integer, nullable=False)
    group_ten= db.Column(db.Integer, nullable=False)
    group_eleven = db.Column(db.Integer, nullable=False)
    group_twelve = db.Column(db.Integer, nullable=False)
    group_thirteen = db.Column(db.Integer, nullable=False)

    dateUpload = db.Column(db.DateTime, default=db.func.current_timestamp())

    @classmethod
    def find_by_account(cls, account: str) -> ["DonationModel"]:
        return cls.query.filter_by(account=account).order_by(DonationModel.dateUpload.desc()).all()
    
    @classmethod
    def find_latest_by_account(cls, account: str) -> "DonationModel":
        return cls.query.filter_by(account=account).order_by(cls.dateUpload.desc()).first()

    @classmethod
    def find_by_submitID(cls, submitUUID: str) -> "DonationModel":
        return cls.query.filter_by(submitUUID=submitUUID).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
