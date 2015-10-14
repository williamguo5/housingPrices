# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0002_auto_20151001_1317'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='suburb',
            name='timeToCBD',
        ),
        migrations.AddField(
            model_name='suburb',
            name='timeToCbdPrivate',
            field=models.CharField(blank=True, null=True, max_length=100),
        ),
        migrations.AddField(
            model_name='suburb',
            name='timeToCbdPublic',
            field=models.CharField(blank=True, null=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='suburb',
            name='postcode',
            field=models.CharField(blank=True, null=True, max_length=4),
        ),
        migrations.AlterField(
            model_name='suburb',
            name='schools',
            field=models.ManyToManyField(blank=True, to='suburbs.School', null=True),
        ),
        migrations.AlterField(
            model_name='suburb',
            name='state',
            field=models.CharField(blank=True, null=True, max_length=3),
        ),
    ]
