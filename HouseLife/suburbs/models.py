from django.db import models

class School(models.Model):
    rank = models.IntegerField()
    name = models.CharField(max_length=100)
    government = models.BooleanField(default=False)
    primary = models.BooleanField(default=False)
    secondary = models.BooleanField(default=False)
    religion = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    class Meta:
        ordering = ('secondary','rank')

class Suburb(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=3)
    postcode = models.CharField(max_length=4)
    housePrice = models.IntegerField()
    unitPrice = models.IntegerField()
    timeToCBD = models.CharField(max_length=100)
    schools = models.ManyToManyField(School)

    class Meta:
        ordering = ('name',)