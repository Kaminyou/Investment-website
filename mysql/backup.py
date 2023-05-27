import os
from datetime import datetime

from celery import Celery
from celery.schedules import crontab

DB_DUMP_TARGET = os.environ.get("DB_DUMP_TARGET", "/home/")
DB_URL = os.environ.get("DB_SERVER", "db")
DB_PORT = os.environ.get("DB_PORT", "3306")
DB_USER = os.environ.get("DB_USER", "root")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "kaminyou")
DB_DATABASE_NAME = os.environ.get("DB_DATABASE_NAME", "spark")
DB_BACKUP_HOUR_FREQ = int(os.environ.get("DB_BACKUP_HOUR_FREQ", 12))
DB_BACKUP_OUTDATED_DAY_CRITERIA = int(
    os.environ.get(
        "DB_BACKUP_OUTDATED_DAY_CRITERIA",
        5,
    ),
)

celery = Celery(__name__)
celery.conf.broker_url = os.environ.get(
    "CELERY_BROKER_URL",
    "redis://redis:6379/1",
)


@celery.task
def backup_mysql():
    now = datetime.utcnow()
    now_str = now.strftime("GMT_%Y%m%d_%H%M%S")

    # clear outdated ones
    for backup_file in os.listdir(DB_DUMP_TARGET):
        try:
            past = datetime.strptime(backup_file, "GMT_%Y%m%d_%H%M%S.sql")
            duration = now - past
            if duration.days > DB_BACKUP_OUTDATED_DAY_CRITERIA:
                os.remove(os.path.join(DB_DUMP_TARGET, backup_file))

        except Exception:
            pass

    # create new one
    filename = f"{now_str}.sql"
    output_path = os.path.join(DB_DUMP_TARGET, filename)
    os.system(f"mysqldump -h {DB_URL} --port {DB_PORT} -u {DB_USER} -p{DB_PASSWORD} {DB_DATABASE_NAME} > {output_path}")  # noqa


celery.conf.beat_schedule = {
    "backup-task": {
        "task": "backup.backup_mysql",
        "schedule": crontab(minute=0, hour=f'*/{DB_BACKUP_HOUR_FREQ}'),
    }
}
