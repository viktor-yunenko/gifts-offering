from django.conf import settings
from django.contrib import admin
from django.db import DEFAULT_DB_ALIAS
from django.db import connections
from django.db.migrations.executor import MigrationExecutor
from django.http import HttpResponse
from django.urls import include
from django.urls import path
from django.urls import re_path
from django.views.static import serve
from strawberry.django.views import AsyncGraphQLView

from gifts.graphql.schema import schema
from gifts.settings import DjangoEnv


def healthcheck_view(request):
    executor = MigrationExecutor(connections[DEFAULT_DB_ALIAS])
    plan = executor.migration_plan(executor.loader.graph.leaf_nodes())
    if plan:
        return HttpResponse("error: pending migrations", status=503)
    else:
        return HttpResponse("ok")


graphql_view = AsyncGraphQLView.as_view(
    schema=schema,
    graphql_ide="graphiql" if settings.DJANGO_ENV == DjangoEnv.LOCAL else None,
)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("select2/", include("django_select2.urls")),
    path("accounts/", include("allauth.urls")),
    path(
        "api/",
        include(
            [
                path("graphql", graphql_view),
                path("graphql/<operation>", graphql_view),
            ]
        ),
    ),
    path("healthcheck/", healthcheck_view),
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.MEDIA_ROOT,
        },
    ),
]

if settings.DEBUG:
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]

if settings.DJANGO_ENV in (DjangoEnv.LOCAL, DjangoEnv.BUILD):
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns += staticfiles_urlpatterns()
