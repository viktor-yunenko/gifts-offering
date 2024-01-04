from typing import cast

import strawberry
import strawberry_django
from asgiref.sync import sync_to_async
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ValidationError
from django.db import transaction
from strawberry import ID
from strawberry.types import Info

from gifts.apps.auth.models import User
from gifts.apps.gifts.graphql.types import GiftOrderType
from gifts.apps.gifts.models import Gift
from gifts.apps.gifts.models import GiftOrder
from gifts.apps.gifts.models import OrderStatus


@strawberry.type
class GiftsMutation:
    @strawberry_django.mutation()
    async def gift_order_submit(
        self,
        info: Info,
        gift_id: ID,
        is_ignore_points_balance: bool = False,
    ) -> GiftOrderType:
        return await sync_to_async(gift_order_request)(
            info=info,
            gift_id=gift_id,
            is_ignore_points_balance=is_ignore_points_balance,
            order_status=OrderStatus.PENDING,
        )

    @strawberry_django.mutation()
    async def gift_order_withdraw(
        self,
        info: Info,
        gift_id: ID,
        is_ignore_points_balance: bool = False,
    ) -> GiftOrderType:
        return await sync_to_async(gift_order_request)(
            info=info,
            gift_id=gift_id,
            is_ignore_points_balance=is_ignore_points_balance,
            order_status=OrderStatus.WITHDRAWN,
        )


def gift_order_request(
    info: Info,
    gift_id: ID,
    is_ignore_points_balance: bool,
    order_status: OrderStatus,
) -> GiftOrderType:
    with transaction.atomic():
        user: User = info.context.request.user
        if not Gift.objects.filter(id=gift_id, user=user).exists():
            raise PermissionDenied()

        order, _ = GiftOrder.objects.get_or_create(
            gift_id=gift_id,
            user=user,
        )
        order.status = order_status
        order.save()

        match order_status:
            case OrderStatus.PENDING:
                if not is_ignore_points_balance and user.points < order.gift.points:
                    raise ValidationError("not_enough_points")
                user.points -= order.gift.points
            case OrderStatus.WITHDRAWN:
                user.points += order.gift.points
            case _:
                raise ValueError(f"Unknown order status: {order_status}")
        user.save()
    return cast(GiftOrderType, order)
