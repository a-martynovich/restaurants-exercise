import hashlib

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Avg
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @property
    def restaurants(self):
        if self.user.has_perm('restaurants.can_add_reply'):
            return Restaurant.objects.filter(owner=self.user)
        else:
            return Restaurant.objects.all()


class Restaurant(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    summary = models.TextField()
    description = models.TextField()

    @property
    def reviews_count(self):
        return self.review_set.count()

    @property
    def average_rating(self):
        rating = self.review_set.aggregate(Avg('rating'))['rating__avg']
        return round(rating, 1) if rating is not None else None


class Review(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.DO_NOTHING)
    visitor = models.ForeignKey(to=User, on_delete=models.DO_NOTHING)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1),
                                                          MaxValueValidator(5)])
    comment = models.TextField()
    visited_at = models.DateField()
    timestamp = models.DateTimeField(auto_now_add=True)

    @property
    def user_name(self):
        return self.visitor.first_name

    @property
    def user_hash(self):
        return hashlib.md5(self.visitor.email.encode()).hexdigest()

    @property
    def is_latest(self):
        return getattr(self, '_is_latest', False)

    @is_latest.setter
    def is_latest(self, b):
        self._is_latest = b

    @property
    def is_highest_rated(self):
        return getattr(self, '_is_highest_rated', False)

    @is_highest_rated.setter
    def is_highest_rated(self, b):
        self._is_highest_rated = b

    @property
    def is_lowest_rated(self):
        return getattr(self, '_is_lowest_rated', False)

    @is_lowest_rated.setter
    def is_lowest_rated(self, b):
        self._is_lowest_rated = b


class Reply(models.Model):
    review = models.OneToOneField(to=Review, on_delete=models.DO_NOTHING)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        instance.profile = Profile.objects.create(user=instance)
    instance.profile.save()