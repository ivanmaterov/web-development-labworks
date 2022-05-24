from unicodedata import category
from rest_framework import serializers

from apps.product.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    """Serializer for categories."""
    class Meta:
        model = Category
        fields = [
            'id',
            'title',
        ]


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    category = CategorySerializer()

    """Serializer for products."""
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'category',
            'price',
            'image',
            'description',
            'price',
        ]
