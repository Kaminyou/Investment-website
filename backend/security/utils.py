import datetime
import uuid


def get_uuid():
    return str(uuid.uuid4())


def get_AOETime(to_str=True):
    aoe_time = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12))
    if to_str:
        return aoe_time.strftime("%Y-%m-%d %H:%M:%S")
    else:
        return aoe_time.replace(microsecond=0)
