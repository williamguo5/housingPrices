# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0007_auto_20151013_1027'),
    ]

    operations = [
        migrations.AddField(
            model_name='suburb',
            name='description',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='suburb',
            name='longDescription',
            field=models.CharField(blank=True, max_length=3300),
        ),
    ]
