from __future__ import annotations

import strawberry_django
from django.db.models import QuerySet
from strawberry.types import Info

from gifts.apps.auth.graphql.types import UserType
from gifts.apps.gifts.models import Gift
from gifts.apps.gifts.models import GiftImage
from gifts.apps.gifts.models import GiftOrder


@strawberry_django.type(Gift, fields="__all__")
class GiftType:
    order: GiftOrderType | None

    @classmethod
    def get_queryset(cls, queryset: QuerySet[Gift], info: Info) -> QuerySet[Gift]:
        return queryset.filter(user=info.context.request.user)


@strawberry_django.type(GiftOrder, fields="__all__")
class GiftOrderType:
    gift: GiftType
    user: UserType

    @classmethod
    def get_queryset(cls, queryset: QuerySet[GiftOrder], info: Info) -> QuerySet[GiftOrder]:
        return queryset.filter(user=info.context.request.user)


@strawberry_django.input(GiftOrder, fields="__all__")
class GiftOrderInput:
    gift: GiftType
    user: UserType

    @classmethod
    def get_queryset(cls, queryset: QuerySet[GiftImage], info: Info) -> QuerySet[GiftImage]:
        return queryset.filter(user=info.context.request.user)


@strawberry_django.type(GiftImage, fields="__all__")
class GiftImageType:
    gift: GiftType

    @classmethod
    def get_queryset(cls, queryset: QuerySet[GiftImage], info: Info) -> QuerySet[GiftImage]:
        return queryset.filter(gift__user=info.context.request.user)
