import strawberry
from strawberry_django import mutations

from gifts.apps.gifts.graphql.types import GiftOrderType


@strawberry.type
class GiftsMutation:
    create_gift_oder = mutations.create(
        GiftOrderType,
    )
