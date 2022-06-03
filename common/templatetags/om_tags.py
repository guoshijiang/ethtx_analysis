#encoding=utf-8

from urllib.parse import urljoin
import pytz
import json
from django.conf import settings
from django import template
from common.helpers import vformat, utc2str, d0, dec


register = template.Library()


@register.filter(name='vformat')
def decimal_format(value):
    return vformat(value)


@register.filter(name='hdatetime')
def repr_datetime(value):
    if not value:
        return ''
    tz = pytz.timezone(settings.TIME_ZONE)
    return utc2str(value.astimezone(tz), "%Y-%m-%d %H:%M:%S")


@register.filter(name='hdate')
def repr_date(value):
    if not value:
        return ''
    tz = pytz.timezone(settings.TIME_ZONE)
    return value.astimezone(tz).strftime("%Y-%m-%d")
