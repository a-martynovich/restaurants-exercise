# Generated by Django 3.0.7 on 2020-06-10 09:27

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType


def create_groups(apps, schema_editor):
    Restaurant = apps.get_model("restaurants", "Restaurant")
    Review = apps.get_model("restaurants", "Review")
    Reply = apps.get_model("restaurants", "Reply")
    Profile = apps.get_model("restaurants", "Profile")
    can_reply = Permission.objects.create(name='Can reply', codename='can_add_reply',
                              content_type=ContentType.objects.get_for_model(Reply))
    can_review = Permission.objects.create(name='Can review', codename='can_add_review',
                                          content_type=ContentType.objects.get_for_model(Review))
    can_add_restaurant = Permission.objects.create(name='Can add restaurant', codename='can_add_restaurant',
                                          content_type=ContentType.objects.get_for_model(Restaurant))
    can_edit = Permission.objects.create(name='Can review', codename='can_edit',
                                          content_type=ContentType.objects.get_for_model(Profile))


    g = Group.objects.create(name='owners')
    g.permissions.add(can_reply)
    g.permissions.add(can_add_restaurant)
    g = Group.objects.create(name='admins')
    g.permissions.add(can_edit)
    g = Group.objects.create(name='visitors')
    g.permissions.add(can_review)


def destroy_groups(apps, schema_editor):
    Group.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=255)),
                ('summary', models.TextField()),
                ('description', models.TextField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('comment', models.TextField()),
                ('visited_at', models.DateField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='restaurants.Restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('review', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='restaurants.Review')),
            ],
        ),
        migrations.RunPython(create_groups, destroy_groups)
    ]
