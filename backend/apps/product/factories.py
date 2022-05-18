import random

import factory
from factory.django import DjangoModelFactory

from apps.product import models


class ProductFactory(DjangoModelFactory):
    """Product factory."""
    category = factory.Iterator(models.Category.objects.all())
    name = factory.Faker('company')
    slug = factory.Faker('company')
    image = factory.django.ImageField(color='blue')
    description = factory.Faker('text')
    price = factory.LazyAttribute(lambda _: random.randint(1000, 100000))

    class Meta:
        model = models.Product
