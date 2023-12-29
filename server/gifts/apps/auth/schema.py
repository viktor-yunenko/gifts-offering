import strawberry
from strawberry.types import Info
from strawberry_django import auth
from strawberry_django import mutations

from gifts.apps.auth.types import UserType
from gifts.apps.auth.types import UserTypeInput


@strawberry.type
class AuthMutation:
    create_user: UserType = auth.register(UserTypeInput)
    update_user: UserType = mutations.update(UserTypeInput)
