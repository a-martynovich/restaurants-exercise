from django.conf import settings
from rest_framework import serializers

from .models import Restaurant, Reply, Review, Profile


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'summary', 'description', 'reviews_count', 'awaits_reply', 'average_rating']
        read_only_fields = ['id', 'reviews_count', 'average_rating', 'awaits_reply']


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
    owner_reply = ReplySerializer(source='reply', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'restaurant', 'rating', 'comment', 'visited_at', 'timestamp', 'owner_reply',
                  'user_name', 'user_hash', 'is_latest', 'is_highest_rated', 'is_lowest_rated']
        extra_kwargs = {'timestamp': {'format': '%Y-%m-%d %H:%M %p'}}
        read_only_fields = ['timestamp', 'id', 'owner_reply', 'user_name', 'user_hash',
                            'is_latest', 'is_highest_rated', 'is_lowest_rated']


class ReviewListSerializer(serializers.ModelSerializer):
    reviews = serializers.ListSerializer(child=ReviewSerializer(), source='review_set')

    class Meta:
        model = Restaurant
        fields = ['reviews']

