import logging

import strawberry
import strawberry_django
from strawberry_django.permissions import IsAuthenticated

from gifts.apps.gifts.graphql.types import GiftImageType
from gifts.apps.gifts.graphql.types import GiftOrderType
from gifts.apps.gifts.graphql.types import GiftType


logger = logging.getLogger(__name__)

auth_required = IsAuthenticated()


@strawberry.type
class GiftsQuery:
    gift: GiftType = strawberry_django.field(extensions=[auth_required])
    gifts: list[GiftType] = strawberry_django.field(extensions=[auth_required])

    gift_image: GiftImageType = strawberry_django.field(extensions=[auth_required])
    gift_images: list[GiftImageType] = strawberry_django.field(extensions=[auth_required])

    gift_order: GiftOrderType = strawberry_django.field(extensions=[auth_required])
    gift_orders: list[GiftOrderType] = strawberry_django.field(extensions=[auth_required])
