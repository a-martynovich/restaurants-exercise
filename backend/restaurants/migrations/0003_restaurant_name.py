# Generated by Django 3.0.7 on 2020-06-10 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0002_reply_restaurant_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='name',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
