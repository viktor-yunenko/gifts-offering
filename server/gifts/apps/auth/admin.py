from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from gifts.apps.auth.models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = [
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_staff",
        "date_joined",
        "last_login",
    ]
    search_fields = [
        "pk",
        "email",
        "first_name",
        "last_name",
    ]
    ordering = ["-date_joined"]
    list_filter = [
        "is_active",
        "date_joined",
        "is_staff",
        "is_superuser",
    ]
    fieldsets = (
        (
            None,
            {
                "fields": [
                    "email",
                    "password",
                    "first_name",
                    "last_name",
                    "last_login",
                    "date_joined",

                ],
            },
        ),
        (
            "Permissions",
            {
                "fields": [
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                ],
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "password1", "password2"],
            },
        ),
    )
