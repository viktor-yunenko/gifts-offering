import os.path
from enum import Enum
from pathlib import Path

import dj_database_url
import environ
import sentry_sdk
from corsheaders.defaults import default_headers
from dotenv import load_dotenv
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.strawberry import StrawberryIntegration
from strawberry_django.settings import StrawberryDjangoSettings

from gifts.utils import sentry


BASE_DIR = Path(__file__).resolve().parent.parent
os.chdir(BASE_DIR)  # for pycharm django console, which has a bug re chdir project_root

env = environ.Env()


class DjangoEnv(Enum):
    LOCAL = "local"
    STAGE = "stage"
    PROD = "prod"
    BUILD = "build"


DJANGO_ENV = DjangoEnv(env.str("DJANGO_ENV", DjangoEnv.LOCAL.value))

if DJANGO_ENV is DjangoEnv.LOCAL:
    load_dotenv(os.path.join(BASE_DIR, ".env.local"), override=False)

DJANGO_ENV_ENUM = DjangoEnv

SENTRY_TRACES_SAMPLE_RATE = env.float("SENTRY_TRACE_SAMPLE_RATE", 1.0)

project_name = "gifts"

if DJANGO_ENV in (DjangoEnv.STAGE, DjangoEnv.PROD) or env.bool("IS_ENABLE_SENTRY", False):
    sentry_release = env.str("SENTRY_RELEASE", None)
    sentry_sdk.init(
        dsn=env.str(
            "SENTRY_DSN",
            "https://482eb6c9cff14d8f94e53cd82060b559@o359384.ingest.sentry.io/4503921800970240",
        ),
        server_name=env.str("RENDER_SERVICE_NAME", None),
        integrations=[
            DjangoIntegration(),
            StrawberryIntegration(),
        ],
        traces_sampler=sentry.traces_sampler,
        traces_sample_rate=SENTRY_TRACES_SAMPLE_RATE,
        profiles_sample_rate=SENTRY_TRACES_SAMPLE_RATE,
        send_default_pii=True,
        environment=DJANGO_ENV.value,
        release=f"{project_name}@{sentry_release}" if sentry_release else None,
        # strawberry integration only shows HTTP body, that's confusing
        attach_stacktrace=True,
        enable_tracing=True,
    )

SECRET_KEY = env.str(
    "SECRET_KEY", "9!v>Cz:i?2>):76Sta}@2/z94(.JH/p),M%iTP't&93r6SJ9}_Vq&.9e[]~y)a1?"
)

DEBUG = env.bool("DJANGO_DEBUG", DJANGO_ENV not in (DjangoEnv.STAGE, DjangoEnv.PROD))

INSTALLED_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    "django.contrib.sites",
    "django.contrib.humanize",
    "gifts.apps.auth",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "admin_auto_filters",
    "django_select2",
    "django_select2_admin_filters",
    "django_object_actions",
    "adminsortable2",
    "adminutils",
    "corsheaders",
    "anymail",
    "simple_history",
    "strawberry_django",
]

static_service_middleware = "whitenoise.middleware.WhiteNoiseMiddleware"
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    static_service_middleware,
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "simple_history.middleware.HistoryRequestMiddleware",  # noqa
    "hijack.middleware.HijackUserMiddleware",
]

if DJANGO_ENV == DjangoEnv.LOCAL:
    # daphne hangs on infinite load if you add it
    # in prod should be ok since we have no static anyway except admin
    MIDDLEWARE.remove(static_service_middleware)

if DEBUG:
    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.insert(0, "strawberry_django.middlewares.debug_toolbar.DebugToolbarMiddleware")
    DEBUG_TOOLBAR_PANELS = [
        "debug_toolbar.panels.history.HistoryPanel",
        "debug_toolbar.panels.versions.VersionsPanel",
        "debug_toolbar.panels.timer.TimerPanel",
        "debug_toolbar.panels.settings.SettingsPanel",
        "debug_toolbar.panels.headers.HeadersPanel",
        "debug_toolbar.panels.request.RequestPanel",
        "debug_toolbar.panels.sql.SQLPanel",
        "debug_toolbar.panels.staticfiles.StaticFilesPanel",
        "debug_toolbar.panels.templates.TemplatesPanel",
        "debug_toolbar.panels.cache.CachePanel",
        "debug_toolbar.panels.signals.SignalsPanel",
        "debug_toolbar.panels.redirects.RedirectsPanel",
        "debug_toolbar.panels.profiling.ProfilingPanel",
    ]

ASGI_APPLICATION = "gifts.asgi.application"

FRONTEND_URL = env.str("FRONTEND_URL", "http://localhost:3000")
BACKEND_URL = env.str("BACKEND_URL", "http://localhost:8000")

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = [
    BACKEND_URL,
    BACKEND_URL.replace("http://", "https://"),
    FRONTEND_URL,
    FRONTEND_URL.replace("http://", "https://"),
]
CORS_ALLOW_CREDENTIALS = True
CORS_URLS_REGEX = r"^/api/.*$"
CORS_EXPOSE_HEADERS = ["X-CSRFToken"]

SESSION_COOKIE_DOMAIN = env.str("SESSION_COOKIE_DOMAIN", None)

CORS_ALLOW_HEADERS = (
    *default_headers,
    "baggage",
    "sentry-trace",
)
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "https://localhost:3000",
]
SITE_ID = 1
ALLOWED_HOSTS = env.list(
    "ALLOWED_HOSTS",
    default=[
        ".localhost",
        "127.0.0.1",
        "[::1]",
        BACKEND_URL.replace("http://", "").replace("https://", ""),
    ],
)
RENDER_EXTERNAL_HOSTNAME = env.str("RENDER_EXTERNAL_HOSTNAME", "")
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

ROOT_URLCONF = "gifts.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            "loaders": [
                (
                    "django.template.loaders.cached.Loader",
                    [
                        "django.template.loaders.filesystem.Loader",
                        "django.template.loaders.app_directories.Loader",
                    ],
                ),
            ],
        },
    },
]
if DJANGO_ENV == DjangoEnv.BUILD:
    DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
else:
    DATABASES = {
        "default": dj_database_url.config(
            conn_max_age=600,
            default=env.str("DATABASE_URL"),
        )
                   | {  # Required for tests with unicode data to work: https://code.djangoproject.com/ticket/27061
                       "TEST": {
                           "CHARSET": "UTF8",
                           "TEMPLATE": "template0",
                       }
                   }
    }

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
DATETIME_FORMAT = "Y.m.d H:i"
USE_L10N = False  # to make admin dates readable
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

STATIC_URL = "/static/"
# noinspection PyUnresolvedReferences
STATIC_ROOT = os.path.join(BASE_DIR, "static_collected")
MEDIA_URL = "/media/"
STORAGES = {
    "default": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

SELECT2_CACHE_BACKEND = "select2"

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "django_cache",
        "TIMEOUT": 60 * 60,
    },
    SELECT2_CACHE_BACKEND: {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "django_select2_cache",
        "TIMEOUT": 60 * 60,
    },
}

AUTH_USER_MODEL = "gifts_auth.User"
LOGIN_REDIRECT_URL = FRONTEND_URL
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "optional"
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = None
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = (
    ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL
)
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 7
ACCOUNT_EMAIL_SUBJECT_PREFIX = ""
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_LOGIN_ON_PASSWORD_RESET = True
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
ACCOUNT_DEFAULT_HTTP_PROTOCOL = "http"
ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
if DJANGO_ENV == DjangoEnv.PROD or DJANGO_ENV == DjangoEnv.STAGE:
    ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https"

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

SESSION_COOKIE_SECURE = env.bool("SESSION_COOKIE_SECURE", False)
SESSION_COOKIE_HTTPONLY = True
# Expire session after six months.
SESSION_COOKIE_AGE = 3600 * 24 * 30 * 6

EMAIL_BACKEND = env.str("EMAIL_BACKEND", "anymail.backends.postmark.EmailBackend")
EMAIL_USE_TLS = True
ANYMAIL = {
    "POSTMARK_SERVER_TOKEN": env.str(
        "POSTMARK_SERVER_TOKEN", "c731a71f-0a8f-453d-8ec4-f37037e4be07"
    ),
}

SHELL_PLUS = "ipython"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
}

DEFAULT_DJANGO_SETTINGS = StrawberryDjangoSettings(
    FIELD_DESCRIPTION_FROM_HELP_TEXT=True,
    TYPE_DESCRIPTION_FROM_MODEL_DOCSTRING=True,
    GENERATE_ENUMS_FROM_CHOICES=True,
    MUTATIONS_DEFAULT_ARGUMENT_NAME="data",
    MUTATIONS_DEFAULT_HANDLE_ERRORS=False,
    MAP_AUTO_ID_AS_GLOBAL_ID=False,
)
