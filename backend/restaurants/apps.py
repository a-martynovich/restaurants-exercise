import logging

from django.apps import AppConfig
from django.conf.global_settings import DATETIME_INPUT_FORMATS, DATE_INPUT_FORMATS

DATETIME_INPUT_FORMATS += ('%Y-%m-%d %H:%M %p',)
DATE_INPUT_FORMATS += ('%d-%m-%Y',)



logger = logging.getLogger('django')


class RestaurantsSystemConfig(AppConfig):
    name = 'restaurants'
