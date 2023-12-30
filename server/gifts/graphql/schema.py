import strawberry
from django.conf import settings
from graphql.validation import NoSchemaIntrospectionCustomRule
from strawberry.extensions import AddValidationRules
from strawberry.extensions import ParserCache
from strawberry.extensions import ValidationCache
from strawberry.schema.config import StrawberryConfig
from strawberry_django.auth import current_user
from strawberry_django.optimizer import DjangoOptimizerExtension
from strawberry_django.permissions import IsAuthenticated

from gifts.apps.auth.graphql.types import UserType
from gifts.apps.gifts.graphql.mutations import GiftsMutation
from gifts.apps.gifts.graphql.query import GiftsQuery
from gifts.graphql.schema_with_error_logging import SchemaWithErrorLogging


auth_required = IsAuthenticated()


@strawberry.type
class Query(GiftsQuery):
    user_current: UserType | None = current_user()


@strawberry.type
class Mutation(GiftsMutation):
    pass


schema_extensions = [
    DjangoOptimizerExtension,
    ParserCache(maxsize=128),
    ValidationCache(maxsize=128),
]

if not settings.DEBUG:
    schema_extensions.append(AddValidationRules([NoSchemaIntrospectionCustomRule]))

schema = SchemaWithErrorLogging(
    query=Query,
    mutation=Mutation,
    extensions=schema_extensions,
    config=StrawberryConfig(
        auto_camel_case=False,
    ),
)
