import logging

import strawberry
import strawberry_django
from django.conf import settings
from django.core.exceptions import ValidationError
from graphql import GraphQLError
from graphql.validation import NoSchemaIntrospectionCustomRule
from strawberry.extensions import AddValidationRules
from strawberry.extensions import ParserCache
from strawberry.extensions import ValidationCache
from strawberry.schema.config import StrawberryConfig
from strawberry.types import ExecutionContext
from strawberry_django import mutations
from strawberry_django.auth import current_user
from strawberry_django.optimizer import DjangoOptimizerExtension
from strawberry_django.permissions import IsAuthenticated

from gifts.apps.auth.graphql.types import UserType
from gifts.apps.gifts.graphql.types import GiftImageType
from gifts.apps.gifts.graphql.types import GiftOrderInput
from gifts.apps.gifts.graphql.types import GiftOrderType
from gifts.apps.gifts.graphql.types import GiftType


logger = logging.getLogger(__name__)

auth_required = IsAuthenticated()


@strawberry.type
class Query:
    user_current: UserType | None = current_user()

    gift: GiftType = strawberry_django.field(extensions=[auth_required])
    gifts: list[GiftType] = strawberry_django.field(extensions=[auth_required])

    gift_image: GiftImageType = strawberry_django.field(extensions=[auth_required])
    gift_images: list[GiftImageType] = strawberry_django.field(extensions=[auth_required])

    gift_order: GiftOrderType = strawberry_django.field(extensions=[auth_required])
    gift_orders: list[GiftOrderType] = strawberry_django.field(extensions=[auth_required])


@strawberry.type
class Mutation:
    gift_order_create: GiftOrderType = mutations.create(GiftOrderInput)


class ErrorLoggingSchema(strawberry.Schema):
    def process_errors(
        self,
        errors: list[GraphQLError],
        execution_context: ExecutionContext = None,
    ):
        """
        By default strawberry logs python's exceptions only to the graphql response JSON,
        alongside django's ValidationError and invalid fields.
        But we want Exceptions in Sentry with full stack trace.
        """

        for error in errors:
            if error_original := getattr(error, "original_error"):
                if isinstance(error_original, ValidationError):
                    logger.warning(f"ValidationError: {error_original.message}")
                    errors.remove(error)
                    if "User is not logged in" in error_original.message:
                        execution_context.context.response.status_code = 401
                    else:
                        execution_context.context.response.status_code = 400
                else:
                    logger.exception(error_original)

        super().process_errors(errors, execution_context)


schema_extensions = [
    DjangoOptimizerExtension,
    ParserCache(maxsize=128),
    ValidationCache(maxsize=128),
]

if not settings.DEBUG:
    schema_extensions.append(AddValidationRules([NoSchemaIntrospectionCustomRule]))

schema = ErrorLoggingSchema(
    query=Query,
    mutation=Mutation,
    extensions=schema_extensions,
    config=StrawberryConfig(
        auto_camel_case=False,
    ),
)
