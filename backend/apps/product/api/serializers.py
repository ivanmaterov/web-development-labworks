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
        ]

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)
        instance.category = Category.objects.get(id=validated_data.get('category')['id'])
        instance.price = validated_data.get('price', instance.price)
        instance.image = validated_data.get('image', instance.image)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance
