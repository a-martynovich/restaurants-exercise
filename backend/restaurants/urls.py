"""restaurants URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from .views import SignInView, SignUpView, RestaurantsView, LogOutView, UserView, UsersView, ReviewsView, ReplyView, \
    RootView

urlpatterns = [
    path('', RootView.as_view(), name='root'),
    path('admin/', admin.site.urls),
    path('login/', SignInView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('logout/', LogOutView.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('users/', UsersView.as_view(), name='users'),
    path('users/<int:pk>/', UsersView.as_view(), name='users-detail'),
    path('restaurants/', RestaurantsView.as_view(), name='restaurants'),
    path('restaurants/<int:pk>/', RestaurantsView.as_view(), name='restaurant'),
    path('reviews/<int:restaurant_pk>/', ReviewsView.as_view(), name='reviews'),
    path('reply/<int:review_pk>/', ReplyView.as_view(), name='reply')
]
