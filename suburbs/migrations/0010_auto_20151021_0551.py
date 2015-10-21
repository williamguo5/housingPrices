# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.postgres.fields


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0009_auto_20151017_0924'),
    ]

    operations = [
        migrations.CreateModel(
            name='SuburbImages',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('imageUrl', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=3000), size=None)),
            ],
        ),
        migrations.AddField(
            model_name='suburb',
            name='suburbImages',
            field=models.ManyToManyField(blank=True, to='suburbs.SuburbImages'),
        ),
    ]
