from decimal import Decimal

from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from gifts.apps.gifts.models import Gift
from gifts.apps.gifts.models import GiftImage
from gifts.apps.gifts.models import GiftOrder


@admin.register(Gift)
class GiftAdmin(SimpleHistoryAdmin):
    list_display = [
        "name",
        "points",
        "fit_confidence",
        "is_published",
        "created_at",
        "updated_at",
        "description_short",
    ]
    list_filter = [
        "is_published",
        "created_at",
        "updated_at",
    ]
    search_fields = ["name", "description"]


@admin.register(GiftImage)
class GiftImageAdmin(SimpleHistoryAdmin):
    list_display = ["gift", "caption", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["caption", "gift__name"]


@admin.register(GiftOrder)
class GiftOrderAdmin(SimpleHistoryAdmin):
    list_display = [
        "gift",
        "user",
        "status",
        "amount",
        "get_points",
        "created_at",
        "updated_at",
    ]
    list_filter = ["status", "created_at"]
    search_fields = [
        "gift__name",
        "user__email",
        "user__first_name",
    ]

    @admin.display(description="Points")
    def get_points(self, obj: GiftOrder) -> Decimal:
        return obj.gift.points * obj.amount
