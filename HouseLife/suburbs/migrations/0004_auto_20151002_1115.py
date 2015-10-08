# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0003_auto_20151002_1115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='suburb',
            name='schools',
            field=models.ManyToManyField(to='suburbs.School', blank=True),
        ),
    ]
