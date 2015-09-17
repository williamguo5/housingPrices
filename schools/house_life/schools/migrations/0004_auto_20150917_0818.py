# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schools', '0003_auto_20150917_0801'),
    ]

    operations = [
        migrations.AlterField(
            model_name='school',
            name='rank',
            field=models.IntegerField(),
        ),
    ]
