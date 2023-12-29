from __future__ import annotations

import logging
import typing
from http.cookies import SimpleCookie
from typing import Optional

from django.conf import settings
from sentry_sdk import set_tag


if typing.TYPE_CHECKING:
    from sentry_sdk._types import Event
    from sentry_sdk._types import Hint


logger = logging.getLogger(__name__)



def traces_sampler(sampling_context):
    if sampling_context.get("wsgi_environ", {}).get("PATH_INFO") == "/healthcheck/":
        return 0.0

    return settings.SENTRY_TRACES_SAMPLE_RATE



def before_send_transaction(event: Event, hint: Hint) -> Optional[Event]:
    try:
        _name_transaction_as_graphql_operation(event, hint)
    except Exception as error:
        logger.exception(error)
    return event


def _name_transaction_as_graphql_operation(event: Event, hint: Hint) -> Optional[Event]:
    """
    Otherwise it calls all Transactions as /api/graphql/{operation}/
    while i want to see eg /api/graphql/Inbox/
    """
    if request := event.get("request", {}):
        if query_json_dict := request.get("data"):
            try:
                if operation_name := query_json_dict.get("operationName"):
                    event["transaction"] = event["transaction"].replace(
                        "{operation}",
                        operation_name,
                    )
            except Exception as error:
                logger.exception(error)
    return event
