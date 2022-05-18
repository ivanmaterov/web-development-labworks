from django.conf import settings
from django.db import models
from django.utils.translation import gettext as _
from imagekit import models as imagekitmodels
from imagekit.processors import Transpose

from apps.utils.models import BaseModel

from .category import Category


class Product(BaseModel):
    """Model for product."""
    category = models.ForeignKey(
        to=Category,
        related_name='products',
        on_delete=models.CASCADE,
        verbose_name=_('Category'),
    )

    name = models.CharField(
        max_length=150,
        db_index=True,
        verbose_name=_('Name'),
    )
    slug = models.CharField(
        max_length=150,
        db_index=True,
        unique=True,
        verbose_name=_('Slug'),
    )
    image = imagekitmodels.ProcessedImageField(
        verbose_name=_('Image'),
        blank=True,
        null=True,
        upload_to=settings.DEFAULT_MEDIA_PATH,
        max_length=512,
        processors=[Transpose()],
        options={
            'quality': 100,
        },
    )
    description = models.TextField(
        max_length=1000,
        blank=True,
        verbose_name=_('Description'),
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_('Price'),
    )
    is_available = models.BooleanField(
        default=True,
        verbose_name=_('Available'),
    )

    class Meta:
        ordering = ('name', )
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
        index_together = (('id', 'slug'), )

    def __str__(self):
        # pylint: disable=invalid-str-returned
        return self.name
