# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0004_auto_20151002_1115'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='suburb',
            name='postcode',
        ),
        migrations.RemoveField(
            model_name='suburb',
            name='state',
        ),
        migrations.RemoveField(
            model_name='suburb',
            name='timeToCbdPrivate',
        ),
        migrations.RemoveField(
            model_name='suburb',
            name='timeToCbdPublic',
        ),
    ]
