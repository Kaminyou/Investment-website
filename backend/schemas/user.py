from marshmallow import Schema, fields
from marshmallow.decorators import post_load
from marshmallow.validate import Length

from security import get_sha256


class UserSchema(Schema):
    account = fields.Str(required=True, validate=Length(max=80))
    category = fields.Str(required=True)
    password = fields.Str(required=True, validate=Length(max=80))

    @post_load
    def hash_password(self, data, **kwargs):
        data["password"] = get_sha256(data["password"])
        return data
