# Investment-website
Investment website

## Production mode
1. Please create `.env` and configurate it as:
```env
SQLALCHEMY_DATABASE_URI=...
JWT_SECRET_KEY=...
ADMIN_ACCOUNT=..
```
2. Please modify `backend/sql/create_user.sql` to create root user
3. Server up
```bash
$ docker-compose -f docker-compose.yml up --build -d
```
