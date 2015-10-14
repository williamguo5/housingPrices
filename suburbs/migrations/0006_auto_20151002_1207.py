# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0005_auto_20151002_1207'),
    ]

    operations = [
        migrations.AddField(
            model_name='suburb',
            name='postcode',
            field=models.CharField(blank=True, max_length=4),
        ),
        migrations.AddField(
            model_name='suburb',
            name='state',
            field=models.CharField(blank=True, max_length=3),
        ),
        migrations.AddField(
            model_name='suburb',
            name='timeToCbdPrivate',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='suburb',
            name='timeToCbdPublic',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
