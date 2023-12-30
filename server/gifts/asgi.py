import os

from django.core.asgi import get_asgi_application
from strawberry.channels import GraphQLProtocolTypeRouter


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gifts.settings")
django_asgi_app = get_asgi_application()

# must go after `get_asgi_application()`
from gifts.graphql.schema import schema  # noqa: E402


application = GraphQLProtocolTypeRouter(
    schema,
    url_pattern=r"^/api/graphql",
    django_application=django_asgi_app,
)
