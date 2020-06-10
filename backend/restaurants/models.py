from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Restaurant(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    summary = models.TextField()
    description = models.TextField()


class Review(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.DO_NOTHING)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1),
                                                          MaxValueValidator(5)])
    comment = models.TextField()
    visited_at = models.DateField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Reply(models.Model):
    review = models.OneToOneField(to=Review, on_delete=models.DO_NOTHING)
    comment = models.TextField()


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        instance.profile = Profile.objects.create(user=instance)
    instance.profile.save()