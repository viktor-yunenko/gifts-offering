import strawberry_django

from gifts.apps.auth.models import User


@strawberry_django.type(User, fields="__all__")
class UserType:
    pass


@strawberry_django.input(User, partial=True)
class UserTypeInput(UserType):
    pass
