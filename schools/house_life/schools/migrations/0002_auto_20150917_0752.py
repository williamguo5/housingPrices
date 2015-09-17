# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schools', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Snippet',
            new_name='School',
        ),
        migrations.AlterModelOptions(
            name='school',
            options={'ordering': ('primary',)},
        ),
    ]
