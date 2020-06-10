from django.conf import settings
from rest_framework import serializers

from .models import Restaurant, Reply, Review, Profile


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'summary', 'description', 'reviews_count', 'average_rating']
        read_only_fields = ['id', 'reviews_count', 'average_rating']


class RestaurantListSerializer(serializers.ModelSerializer):
    restaurants = serializers.ListSerializer(child=RestaurantSerializer())

    class Meta:
        model = Profile
        fields = ['restaurants']


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'review', 'comment', 'timestamp']
        extra_kwargs = {'timestamp': {'format': '%Y-%m-%d %H:%M %p'}}
        read_only_fields = ['id', 'timestamp']


class ReviewSerializer(serializers.ModelSerializer):
    owner_reply = ReplySerializer(source='reply')

    class Meta:
        model = Review
        fields = ['id', 'restaurant', 'rating', 'comment', 'visited_at', 'timestamp', 'owner_reply']
        extra_kwargs = {'timestamp': {'format': '%Y-%m-%d %H:%M %p'}}
        read_only_fields = ['timestamp', 'id']


class ReviewListSerializer(serializers.ModelSerializer):
    reviews = serializers.ListSerializer(child=ReviewSerializer(), source='review_set')

    class Meta:
        model = Restaurant
        fields = ['reviews']

