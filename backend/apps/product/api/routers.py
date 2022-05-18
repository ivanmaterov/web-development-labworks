from rest_framework.routers import DefaultRouter

from apps.product.api.views import CategoryViewSet, ProductViewSet

router = DefaultRouter()

router.register('products', CategoryViewSet)
router.register('categories', ProductViewSet)
