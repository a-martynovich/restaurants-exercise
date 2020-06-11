from django.contrib.auth import login, authenticate, logout
from django.db.models import Avg, F
from django.views.generic import TemplateView

from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .forms import MyUserCreationForm
from .serializers import RestaurantSerializer, ReviewListSerializer, \
    ReviewSerializer, ReplySerializer
from .models import Restaurant, Review


class RootView(TemplateView):
    template_name = 'index.html'


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
            restaurants = Restaurant.objects.annotate(rating=Avg('review__rating')).order_by(F('rating').desc(nulls_last=True))
            rating = request.query_params.get('rating')
            if rating:
                restaurants = restaurants.filter(rating__gte=rating)
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
        restaurant = get_object_or_404(Restaurant, pk=restaurant_pk)
        restaurant_reviews = restaurant.review_set
        review_list = []
        highest_rated = restaurant_reviews.order_by('-rating', '-timestamp').first()
        if highest_rated:
            highest_rated.is_highest_rated = True
            review_list.append(highest_rated)
        lowest_rated = restaurant_reviews.order_by('rating', '-timestamp').first()
        if lowest_rated and lowest_rated.pk == highest_rated.pk:
            lowest_rated = None
        if lowest_rated:
            lowest_rated.is_lowest_rated = True
            review_list.append(lowest_rated)
        latest = restaurant_reviews.order_by('-timestamp').first()
        if latest:
            if highest_rated.pk == latest.pk:
                highest_rated.is_latest = True
            elif lowest_rated and lowest_rated.pk == latest.pk:
                lowest_rated.is_latest = True
            else:
                latest.is_latest = True
                review_list.append(latest)
        other_reviews = list(restaurant_reviews.exclude(id__in=[r.id for r in review_list]).order_by('-timestamp'))
        reviews = [ReviewSerializer(r).data for r in review_list+other_reviews]
        return Response({'reviews': reviews})

    def patch(self, request, pk=None, format=None):
        pass

    def post(self, request, restaurant_pk=None, format=None):
        if not request.user.has_perm('restaurants.can_add_review'):
            return Response(status.HTTP_403_FORBIDDEN)
        r = get_object_or_404(Restaurant, pk=restaurant_pk)
        review = Review(visitor=request.user)
        rs = ReviewSerializer(review, data=request.data)
        if rs.is_valid(raise_exception=True):
            rs.save()
            return self.get(request, restaurant_pk=restaurant_pk, format=format)

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
        if not request.user.has_perm('restaurants.can_add_reply'):
            return Response(status.HTTP_403_FORBIDDEN)
        get_object_or_404(Review, pk=review_pk)
        rs = ReplySerializer(data=request.data)
        if rs.is_valid(raise_exception=True):
            rs.save()
        return Response({})

    def delete(self, request, pk=None, format=None):
        pass