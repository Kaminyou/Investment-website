from sqlalchemy import (Column, DateTime, ForeignKey, Integer,
                        String)
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    account = Column(String(80), nullable=False, unique=True)
    category = Column(Integer, nullable=False)
    password = Column(String(80), nullable=False)


class DonationModel(Base):
    __tablename__ = "donation"

    id = Column(Integer, primary_key=True)
    account = Column(ForeignKey('users.account'), nullable=False)
    submitUUID = Column(String(36), nullable=False, unique=True)

    # group
    group_one = Column(Integer, nullable=False)
    group_two = Column(Integer, nullable=False)
    group_three = Column(Integer, nullable=False)
    group_four = Column(Integer, nullable=False)
    group_five = Column(Integer, nullable=False)
    group_six = Column(Integer, nullable=False)
    group_seven = Column(Integer, nullable=False)
    group_nine = Column(Integer, nullable=False)
    group_ten= Column(Integer, nullable=False)
    group_eleven = Column(Integer, nullable=False)
    group_twelve = Column(Integer, nullable=False)
    group_thirteen = Column(Integer, nullable=False)

    dateUpload = Column(DateTime)
