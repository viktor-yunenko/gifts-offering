from typing import cast

import strawberry
import strawberry_django
from django.contrib.auth import aget_user
from django.core.exceptions import PermissionDenied
from strawberry import ID
from strawberry.types import Info

from gifts.apps.gifts.graphql.types import GiftOrderType
from gifts.apps.gifts.models import Gift
from gifts.apps.gifts.models import GiftOrder
from gifts.apps.gifts.models import OrderStatus


@strawberry.type
class GiftsMutation:
    @strawberry_django.mutation()
    async def gift_order_submit(self, gift_id: ID, info: Info) -> GiftOrderType:
        order = await _get_or_create_order(gift_id, info)
        order.status = OrderStatus.PENDING
        await order.asave()
        return cast(GiftOrderType, order)

    @strawberry_django.mutation()
    async def gift_order_withdraw(self, gift_id: ID, info: Info) -> GiftOrderType:
        order = await _get_or_create_order(gift_id, info)
        order.status = OrderStatus.WITHDRAWN
        await order.asave()
        return cast(GiftOrderType, order)


async def _get_or_create_order(gift_id: ID, info: Info) -> GiftOrder:
    user = await aget_user(info.context.request)
    if not await Gift.objects.filter(id=gift_id, user=user).aexists():
        raise PermissionDenied()
    order, is_created = await GiftOrder.objects.aget_or_create(
        gift_id=gift_id,
        user=user,
    )
    return order
