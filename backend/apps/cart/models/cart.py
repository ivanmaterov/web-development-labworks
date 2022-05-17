from django.db import models
from django.utils.translation import gettext as _

from apps.product.models import Product
from apps.users.models import User
from apps.utils.models import BaseModel


class Cart(BaseModel):
    """Model for product cart."""
    user = models.ForeignKey(
        to=User,
        related_name='users',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_('Users'),
    )
    item = models.ForeignKey(
        to=Product,
        related_name='items',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_('Items'),
    )
    quantity = models.IntegerField(
        null=False,
        default=1,
        verbose_name=_('Quantity of items'),
    )

    def __str__(self):
        # pylint: disable=invalid-str-returned
        return f'Product cart: {self.user}'
