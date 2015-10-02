# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='school',
            name='suburb',
        ),
        migrations.AddField(
            model_name='suburb',
            name='schools',
            field=models.ManyToManyField(to='suburbs.School'),
        ),
    ]
