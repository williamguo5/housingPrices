# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0011_auto_20151021_0629'),
    ]

    operations = [
        migrations.CreateModel(
            name='AgePop',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('zeroToTen', models.IntegerField(default=0)),
                ('tenToNineteen', models.IntegerField(default=0)),
                ('twentyToTwentyNine', models.IntegerField(default=0)),
                ('thirtyToThirtyNine', models.IntegerField(default=0)),
                ('fortyToFortyNine', models.IntegerField(default=0)),
                ('fiftyToFiftyNine', models.IntegerField(default=0)),
                ('sixtyToSixtyNine', models.IntegerField(default=0)),
                ('seventyToSeventyNine', models.IntegerField(default=0)),
                ('eightyPlus', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ('zeroToTen',),
            },
        ),
        migrations.AddField(
            model_name='suburb',
            name='ageDistribution',
            field=models.ManyToManyField(to='suburbs.AgePop', blank=True),
        ),
    ]
