from rest_framework import viewsets

from apps.product.models import Category, Product

from .serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """View for category."""
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    """View for products."""
    queryset = Product.objects.filter(is_available=True).order_by('category_id')
    serializer_class = ProductSerializer
    filterset_fields = {
        'id': (
            'in', 
        )
    }
