from django.db import models
from simple_history.models import HistoricalRecords

from gifts.apps.auth.models import User


class MonitoredModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    history = HistoricalRecords(inherit=True)

    class Meta:
        abstract = True


class Gift(MonitoredModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=1024)
    description_short = models.TextField()
    description_full = models.TextField(blank=True)
    image_card = models.ImageField(upload_to="gifts/cards")
    fit_confidence = models.DecimalField(
        max_digits=10, decimal_places=1, help_text="Is this gift a good fit"
    )
    points = models.DecimalField(max_digits=10, decimal_places=3)

    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class GiftImage(MonitoredModel):
    gift = models.ForeignKey(Gift, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gifts/images")
    caption = models.CharField(max_length=1024)

    def __str__(self):
        return self.caption


class GiftOrder(MonitoredModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    gift = models.ForeignKey(
        Gift, on_delete=models.CASCADE, related_name="orders", related_query_name="order"
    )
    is_confirmed_by_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user} - {self.gift}"
