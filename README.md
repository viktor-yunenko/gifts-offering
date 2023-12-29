### Setup

server setup
- cd server/
- createdb gifts
- createuser gifts --createdb --no-password
- python manage.py migrate
- python manage.py shell
  ```python
  from gifts.apps.auth.models import User
  user = User.objects.create(email="admin@eawork.org", is_superuser=True, is_staff=True, is_active=True)
  user.set_password("admin@eawork.org")
  user.save()
  ```
- python manage.py runserver

client setup
- cd client/
- bun install
- bun run dev
