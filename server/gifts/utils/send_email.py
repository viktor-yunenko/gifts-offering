from anymail.message import AnymailMessage
from django.conf import settings
from django.template.loader import get_template
from markdownify import markdownify


def send_email(
    subject: str,
    email_to: str,
    email_bcc: list[str] = [],  # noqa B006
    email_cc: list[str] = [],  # noqa B006
    template_name: str = None,
    content_html: str = "",
    template_context: dict = {},  # noqa B006
    email_from: str = f"Gifts <support@{settings.DOMAIN}>",
    is_track_clicks: bool = False,
    is_track_opens: bool = False,
    CLIENT_URL: str = None,
    attachment_path: str = None,
) -> str:
    context_txt = ""
    if template_name:
        template_html = get_template(template_name)
        content_html = template_html.render(
            {
                "settings": {
                    "SERVER_URL": settings.SERVER_URL,
                    "CLIENT_URL": CLIENT_URL or settings.CLIENT_URL,
                },
                **template_context,
            }
        )
        context_txt = markdownify(content_html)
    elif content_html:
        context_txt = markdownify(content_html)

    msg = AnymailMessage(
        subject=subject,
        body=context_txt,
        from_email=email_from,
        to=[email_to],
        bcc=email_bcc if email_bcc else [],
        cc=email_cc if email_cc else [],
        track_opens=is_track_opens,
        track_clicks=is_track_clicks,
    )
    msg.attach_alternative(content_html, "text/html")
    if attachment_path:
        msg.attach_file(attachment_path)
    msg.send()

    return msg.anymail_status.message_id
