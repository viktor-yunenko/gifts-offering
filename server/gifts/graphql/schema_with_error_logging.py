import logging

import strawberry
from django.core.exceptions import ValidationError
from graphql import GraphQLError
from strawberry.types import ExecutionContext


logger = logging.getLogger(__name__)


class SchemaWithErrorLogging(strawberry.Schema):
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
                    if hasattr(error_original, "message"):
                        message = error_original.message
                    else:
                        message = ", ".join(error_original.messages)
                    logger.warning(f"ValidationError: {message}")
                    if "User is not logged in" in message:
                        execution_context.context.response.status_code = 401
                else:
                    logger.exception(error_original)

        super().process_errors(errors, execution_context)
