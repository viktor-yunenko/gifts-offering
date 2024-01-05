from __future__ import annotations

from dataclasses import dataclass

from faker import Faker
from faker.proxy import UniqueProxy

from gifts.apps.auth.models import User
from gifts.apps.gifts.models import Gift
from gifts.apps.gifts.models import GiftOrder


class Gen:
    auth: AuthGen
    gifts: GiftsGen

    def __init__(
        self,
        is_random_values_deterministic: bool = True,
        random_seed: int = 42,
    ):
        faker = Faker()

        if is_random_values_deterministic:
            # seeding won't make every self.faker.name() return the same value
            # it'll only make the same #5 call to self.faker.name() return the same value
            faker.seed_instance(random_seed)

        # use faker.unique proxy to avoid non-unique donor emails, etc
        # beware - it might go into an infinite loop trying to return unique data if it runs out of available and
        # keeps trying to get a new unique value
        self.faker: UniqueProxy = faker.unique
        self.random_seeded = faker.random

        self.auth = AuthGen(faker=self.faker)
        self.gifts = GiftsGen(faker=self.faker, auth=self.auth)


@dataclass
class AuthGen:
    faker: UniqueProxy

    user_default: User = None

    async def get_user_default(self) -> User:
        if not self.user_default:
            self.user_default = await self.user(
                email="admin@example.com",
            )
        return self.user_default

    async def user(
        self,
        email: str = None,
        points: int = None,
        is_admin: bool = False,
    ) -> User:
        user = await User.objects.acreate(
            email=email or self.faker.email(domain="example.com"),
            first_name=self.faker.first_name(),
            last_name=self.faker.last_name(),
            points=points or 3,
        )

        if is_admin:
            user.is_staff = True
            user.is_superuser = True
            await user.asave()

        return user


@dataclass
class GiftsGen:
    faker: UniqueProxy

    auth: AuthGen

    async def gift(self, user: User, points: int = None) -> Gift:
        return await Gift.objects.acreate(
            user=user or await self.auth.get_user_default(),
            name=self.faker.name(),
            description_short=self.faker.sentence(nb_words=10),
            image_card=self.faker.image_url(),
            fit_confidence=self.faker.pyfloat(min_value=0, max_value=1),
            points=points or self.faker.pydecimal(left_digits=1, right_digits=2, positive=True),
            is_published=True,
        )

    async def order(self, gift: Gift, user: User, amount: int = None) -> GiftOrder:
        return await GiftOrder.objects.acreate(
            gift=gift,
            user=user,
            amount=amount or gift.order_amount_default,
        )
