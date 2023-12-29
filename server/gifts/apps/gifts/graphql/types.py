import strawberry
import strawberry_django
from strawberry.types import Info

from gifts.apps.auth.graphql.types import UserType
from gifts.apps.gifts import models


@strawberry_django.type(models.Gift, fields="__all__")
class GiftType:
    @strawberry.field()
    def is_accepted(self: models.Gift, info: Info) -> bool:
        return self.orders.filter(user=info.context.request.user).aexists()


@strawberry_django.type(models.GiftOrder, fields="__all__")
class GiftOrderType:
    gift: GiftType
    user: UserType


@strawberry_django.input(models.GiftOrder, fields="__all__")
class GiftOrderInput:
    gift: GiftType
    user: UserType


@strawberry_django.type(models.GiftImage, fields="__all__")
class GiftImageType:
    gift: GiftType
