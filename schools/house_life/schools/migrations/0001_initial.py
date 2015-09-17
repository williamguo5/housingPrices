# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('rank', models.SmallIntegerField()),
                ('school', models.CharField(max_length=100)),
                ('government', models.BooleanField(default=False)),
                ('primary', models.BooleanField(default=False)),
                ('secondary', models.BooleanField(default=False)),
                ('religion', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('suburb', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('postcode', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
            ],
            options={
                'ordering': ('primary', 'secondary'),
            },
        ),
    ]
