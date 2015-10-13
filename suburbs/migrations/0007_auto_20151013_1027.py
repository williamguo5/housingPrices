# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suburbs', '0006_auto_20151002_1207'),
    ]

    operations = [
        migrations.AddField(
            model_name='suburb',
            name='averageSalary',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='suburb',
            name='houseRentalPrice',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='suburb',
            name='unitRentalPrice',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='suburb',
            name='housePrice',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='suburb',
            name='unitPrice',
            field=models.IntegerField(default=0),
        ),
    ]
