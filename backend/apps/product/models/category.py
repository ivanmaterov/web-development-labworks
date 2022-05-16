from django.db import models
from django.utils.translation import gettext as _

from apps.utils.models import BaseModel


class Category(BaseModel):
    """Model for product categories."""
    title = models.CharField(
        max_length=256,
        db_index=True,
        verbose_name=_('Title'),
    )
    slug = models.SlugField(
        max_length=256,
        unique=True,
        verbose_name=_('Slug'),
    )

    class Meta:
        ordering = ('title', )
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')

    def __str__(self):
        # pylint: disable=invalid-str-returned
        return self.title
