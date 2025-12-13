

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from tickets.views import UserRegistrationView

urlpatterns = [
    path('admin/', admin.site.urls),
    

    path('api/auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('api/auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register', UserRegistrationView.as_view(), name='auth_register'),


    path('api/', include('tickets.urls')),
]