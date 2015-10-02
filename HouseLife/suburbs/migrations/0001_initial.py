# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('rank', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
                ('government', models.BooleanField(default=False)),
                ('primary', models.BooleanField(default=False)),
                ('secondary', models.BooleanField(default=False)),
                ('religion', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=50)),
                ('street', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
            ],
            options={
                'ordering': ('secondary', 'rank'),
            },
        ),
        migrations.CreateModel(
            name='Suburb',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=3)),
                ('postcode', models.CharField(max_length=4)),
                ('housePrice', models.IntegerField()),
                ('unitPrice', models.IntegerField()),
                ('timeToCBD', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.AddField(
            model_name='school',
            name='suburb',
            field=models.ForeignKey(to='suburbs.Suburb'),
        ),
    ]
