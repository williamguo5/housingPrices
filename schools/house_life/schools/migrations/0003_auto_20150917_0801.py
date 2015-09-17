# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schools', '0002_auto_20150917_0752'),
    ]

    operations = [
        migrations.RenameField(
            model_name='school',
            old_name='school',
            new_name='name',
        ),
    ]
