from marshmallow import Schema, fields
from marshmallow.decorators import post_load
from marshmallow.validate import Length

from security import get_uuid


class DonationSchema(Schema):
    group_one = fields.Int(default=0)
    group_two = fields.Int(default=0)
    group_three = fields.Int(default=0)
    group_four = fields.Int(default=0)
    group_five = fields.Int(default=0)
    group_six = fields.Int(default=0)
    group_seven = fields.Int(default=0)
    group_nine = fields.Int(default=0)
    group_ten = fields.Int(default=0)
    group_eleven = fields.Int(default=0)
    group_twelve = fields.Int(default=0)
    group_thirteen = fields.Int(default=0)

    @post_load
    def add_uuid(self, data, **kwargs):
        data["submitUUID"] = get_uuid()
        return data
