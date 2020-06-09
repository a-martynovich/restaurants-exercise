import logging

from django.apps import AppConfig


logger = logging.getLogger('django')


class RestaurantsSystemConfig(AppConfig):
    name = 'restaurants'
