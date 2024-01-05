from typing import cast

import strawberry
import strawberry_django
from asgiref.sync import sync_to_async
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ValidationError
from django.db import transaction
from strawberry import ID
from strawberry.types import Info
from strawberry_django.mutations import mutations

from gifts.apps.auth.models import User
from gifts.apps.gifts.graphql.types import GiftOrderInput
from gifts.apps.gifts.graphql.types import GiftOrderType
from gifts.apps.gifts.models import Gift
from gifts.apps.gifts.models import GiftOrder
from gifts.apps.gifts.models import OrderStatus


@strawberry.type
class GiftsMutation:
    gift_order_update: GiftOrderType = mutations.update(GiftOrderInput)

    @strawberry_django.mutation()
    async def gift_order_submit_or_withdraw(
        self,
        info: Info,
        status: OrderStatus,
        gift_id: ID,
        is_ignore_points_balance: bool = False,
    ) -> GiftOrderType:
        return await sync_to_async(gift_order_submit_or_withdraw)(
            user=await get_user(info),
            gift_id=gift_id,
            is_ignore_points_balance=is_ignore_points_balance,
            status=status,
        )

    @strawberry_django.mutation()
    async def gift_order_update_amount(
        self,
        info: Info,
        order_id: ID,
        amount: int,
        is_ignore_points_balance: bool = False,
    ) -> GiftOrderType:
        return await gift_order_update_amount_service(
            user=await get_user(info),
            order_id=order_id,
            amount=amount,
            is_ignore_points_balance=is_ignore_points_balance,
        )


async def gift_order_update_amount_service(
    user: User,
    order_id: ID | int,
    amount: int,
    is_ignore_points_balance: bool = False,
) -> GiftOrderType:
    order = await GiftOrder.objects.select_related("gift").aget(id=order_id)

    amount_prev = order.amount
    amount_new = amount
    order.amount = amount

    points_diff = (amount_new * order.gift.points) - (amount_prev * order.gift.points)
    user.points -= points_diff

    if user.points < 0 and not is_ignore_points_balance:
        raise points_not_enough_error

    await order.asave()
    await user.asave()

    return order


def gift_order_submit_or_withdraw(
    user: User,
    gift_id: ID,
    status: OrderStatus,
    is_ignore_points_balance: bool = False,
) -> GiftOrderType:
    with transaction.atomic():
        if not Gift.objects.filter(id=gift_id, user=user).exists():
            raise PermissionDenied()

        order, _ = GiftOrder.objects.get_or_create(
            gift_id=gift_id,
            user=user,
            defaults={
                "amount": Gift.objects.get(id=gift_id).order_amount_default,
            },
        )
        order.status = status

        match status:
            case OrderStatus.SUBMITTED:
                order.amount = order.gift.order_amount_default
                points_price = order.gift.points * order.amount
                user.points -= points_price
            case OrderStatus.WITHDRAWN:
                user.points += order.gift.points * order.amount

        if (
            user.points < 0
            and not is_ignore_points_balance
            and order.status is not OrderStatus.WITHDRAWN
        ):
            raise points_not_enough_error

        order.save()
        user.save()

    return cast(GiftOrderType, order)


async def get_user(info: Info) -> User:
    user = await sync_to_async(getattr)(info.context.request, "user")
    points = await sync_to_async(getattr)(user, "points")
    return user


points_not_enough_error = ValidationError("not_enough_points")
