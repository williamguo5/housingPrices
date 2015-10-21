# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.postgres.fields


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0010_auto_20151021_0551'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='suburb',
            name='suburbImages',
        ),
        migrations.AddField(
            model_name='suburb',
            name='suburbImages',
            field=django.contrib.postgres.fields.ArrayField(default=[], base_field=models.CharField(max_length=2000), size=None),
        ),
        migrations.DeleteModel(
            name='SuburbImages',
        ),
    ]
