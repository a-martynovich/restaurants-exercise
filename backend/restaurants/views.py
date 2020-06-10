from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Avg

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .forms import MyUserCreationForm
from .serializers import RestaurantSerializer, RestaurantListSerializer, ReviewListSerializer, \
    ReviewSerializer, ReplySerializer
from .models import Profile, Restaurant, Review, Reply


class SignInView(APIView):
    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Wrong username/password.'}, status=status.HTTP_401_UNAUTHORIZED)
        login(request, user)
        return Response({})


class SignUpView(APIView):
    def post(self, request, format=None):
        form = MyUserCreationForm(request.data)
        if form.is_valid():
            new_user = form.save()
            return Response({})
        else:
            return Response({'errors': form.errors, 'non_field_errors': form.non_field_errors()}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def options(self, request, format=None):
        user = request.user
        group = user.groups.first()
        group_name = group.name[:-1]
        return Response({
            'role': group_name,
            'roleName': group_name.capitalize(),
            'name': request.user.first_name + " " + request.user.last_name,
        })


class UsersView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]


class LogOutView(APIView):
    def delete(self, request, format=None):
        logout(request)
        return Response({})


class RestaurantsView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        if pk:
            r = get_object_or_404(Restaurant, id=pk)
            return Response(RestaurantSerializer(r).data)
        else:
            restaurants = request.user.profile.restaurants
            rating = request.query_params.get('rating')
            if rating:
                restaurants = Restaurant.objects.annotate(rating=Avg('review__rating')).filter(rating__gte=rating)
            return Response({'restaurants': [RestaurantSerializer(r).data for r in restaurants]})

    def patch(self, request, pk=None, format=None):
        pass

    def post(self, request, format=None):
        if not request.user.has_perm('restaurants.can_add_restaurant'):
            return Response(status.HTTP_403_FORBIDDEN)
        r = Restaurant(owner=request.user)
        s = RestaurantSerializer(r, data=request.data)
        if s.is_valid(raise_exception=True):
            s.save()
        return self.get(request, format=format)

    def delete(self, request, pk=None, format=None):
        pass


class ReviewsView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, restaurant_pk=None, format=None):
        r = get_object_or_404(Restaurant, pk=restaurant_pk)
        return Response(ReviewListSerializer(r).data)

    def patch(self, request, pk=None, format=None):
        pass

    def post(self, request, restaurant_pk=None, format=None):
        # if not request.user.has_perm('restaurants.can_add_review'):
        #     return Response(status.HTTP_403_FORBIDDEN)
        r = get_object_or_404(Restaurant, pk=restaurant_pk)
        review = Review(visitor=request.user)
        rs = ReviewSerializer(review, data=request.data)
        if rs.is_valid(raise_exception=True):
            rs.save()
            return Response(ReviewListSerializer(r).data)

    def delete(self, request, pk=None, format=None):
        pass


class ReplyView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        pass

    def patch(self, request, pk=None, format=None):
        pass

    def post(self, request, review_pk=None, format=None):
        # if not request.user.has_perm('restaurants.can_add_reply'):
        #     return Response(status.HTTP_403_FORBIDDEN)
        get_object_or_404(Restaurant, pk=review_pk)
        rs = ReplySerializer(data=request.data)
        if rs.is_valid(raise_exception=True):
            rs.save()

    def delete(self, request, pk=None, format=None):
        pass