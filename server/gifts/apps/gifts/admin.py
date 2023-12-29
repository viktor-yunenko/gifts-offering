from django.contrib import admin

from gifts.apps.gifts.models import Gift
from gifts.apps.gifts.models import GiftImage
from gifts.apps.gifts.models import GiftOrder


@admin.register(Gift)
class GiftAdmin(admin.ModelAdmin):
    list_display = ["name", "points", "description_short", "created_at", "updated_at"]
    list_filter = ["created_at", "updated_at"]
    search_fields = ["name", "description"]


@admin.register(GiftImage)
class GiftImageAdmin(admin.ModelAdmin):
    list_display = ["gift", "caption", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["caption", "gift__name"]


@admin.register(GiftOrder)
class GiftOrderAdmin(admin.ModelAdmin):
    list_display = ["gift", "user", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["gift__name", "user__email", "user__first_name"]
