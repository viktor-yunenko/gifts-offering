import dataclasses
import logging
from functools import wraps
from typing import Callable

import pytest
from django.http import HttpRequest
from django.test import RequestFactory
from django.test import TestCase
from django.test import override_settings
from strawberry.types import ExecutionResult

from gifts.apps.auth.models import User
from gifts.graphql.schema import schema
from gifts.utils.gen import Gen


logger = logging.getLogger(__name__)


@override_settings()
class GiftsTestCase(TestCase):
    gen: Gen
    user: User

    def setUp(self):
        super().setUp()
        self.gen = Gen()

    def graphql_query(
        self,
        query: str,
        variables: dict = None,
    ) -> ExecutionResult:
        request = RequestFactory().get("/graphql")
        request.user = self.user

        return schema.execute_sync(
            query,
            variable_values=variables,
            context_value=Context(request=request),
        )


@dataclasses.dataclass
class Context:
    request: HttpRequest


@pytest.mark.skip(reason="This isn't a test")
def test(doc_string: str):
    """
    Uses a decorator to set a docstring for `pytest-pspec` to display in test runs.
    Makes it easier to write and read descriptive test names.
    """

    def wrapper(method: Callable) -> Callable:
        @wraps(method)
        def wrapped(self, *args, **kwargs):
            return method(self, *args, **kwargs)

        wrapped.__doc__ = doc_string
        return wrapped

    return wrapper
