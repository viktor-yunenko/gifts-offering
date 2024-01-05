from asgiref.sync import sync_to_async

from gifts.apps.gifts.graphql.mutations import gift_order_submit_or_withdraw
from gifts.apps.gifts.graphql.mutations import gift_order_update_amount_service
from gifts.apps.gifts.models import OrderStatus
from gifts.utils.test_cases import GiftsTestCase


class MutationsTest(GiftsTestCase):
    async def test_order_amount_increment(self):
        points_original = 3
        user = await self.gen.auth.user(points=points_original)
        gift = await self.gen.gifts.gift(points=1, user=user)

        order = await sync_to_async(gift_order_submit_or_withdraw)(
            user=user,
            gift_id=gift.id,
            status=OrderStatus.SUBMITTED,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, 2)

        await gift_order_update_amount_service(
            user=user,
            order_id=order.id,
            amount=2,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, 1)

        await gift_order_update_amount_service(
            user=user,
            order_id=order.id,
            amount=3,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, 0)

        await sync_to_async(gift_order_submit_or_withdraw)(
            user=user,
            gift_id=gift.id,
            status=OrderStatus.WITHDRAWN,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, points_original)

    async def test_order_withdrawal(self):
        points_original = 3
        user = await self.gen.auth.user(points=points_original)
        gift = await self.gen.gifts.gift(points=1, user=user)

        await self.gen.gifts.order(gift=gift, user=user, amount=2)

        await sync_to_async(gift_order_submit_or_withdraw)(
            user=user,
            gift_id=gift.id,
            status=OrderStatus.WITHDRAWN,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, points_original + 2)

    async def test_order_repeated_placement(self):
        points_original = 3
        user = await self.gen.auth.user(points=points_original)
        gift = await self.gen.gifts.gift(points=1, user=user)

        order = await sync_to_async(gift_order_submit_or_withdraw)(
            user=user,
            gift_id=gift.id,
            status=OrderStatus.SUBMITTED,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, points_original - gift.points)

        await gift_order_update_amount_service(
            user=user,
            order_id=order.id,
            amount=3,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, points_original - gift.points * 3)

        await sync_to_async(gift_order_submit_or_withdraw)(
            user=user,
            gift_id=gift.id,
            status=OrderStatus.WITHDRAWN,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, points_original)

        await sync_to_async(gift_order_submit_or_withdraw)(
            user=user,
            gift_id=gift.id,
            status=OrderStatus.SUBMITTED,
        )
        await user.arefresh_from_db()
        self.assertEqual(user.points, points_original - gift.points)
