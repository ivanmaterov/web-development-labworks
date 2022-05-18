from django.urls import include, path

urlpatterns = [
    path('', include('apps.users.api.urls')),
    path('', include('apps.product.api.urls')),
]
