from db import db


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    account = db.Column(db.String(80), nullable=False, unique=True)
    category = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(80), nullable=False)  # sha256

    def __init__(self, account, category, password):
        self.account = account
        self.password = password
        self.category = category

    @classmethod
    def find_by_account(cls, account: str) -> "UserModel":
        return cls.query.filter_by(account=account).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "UserModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all_users(cls) -> ["UserModel"]:
        return cls.query.all()

    @classmethod
    def reset_password(cls, account: str, password: str) -> None:
        user = cls.query.filter_by(account=account).first()
        user.password = password
        db.session.commit()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
