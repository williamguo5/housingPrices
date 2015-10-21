from django.db import models
from django.contrib.postgres.fields import ArrayField

class AgePop(models.Model):
    zeroToTen = models.IntegerField(default=0)
    tenToNineteen = models.IntegerField(default=0)
    twentyToTwentyNine = models.IntegerField(default=0)
    thirtyToThirtyNine = models.IntegerField(default=0)
    fortyToFortyNine = models.IntegerField(default=0)
    fiftyToFiftyNine = models.IntegerField(default=0)
    sixtyToSixtyNine = models.IntegerField(default=0)
    seventyToSeventyNine = models.IntegerField(default=0)
    eightyPlus = models.IntegerField(default=0)

    class Meta:
        ordering = ('zeroToTen',)


class Hospital(models.Model):
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    lhd = models.CharField(max_length=100)

    class Meta:
        ordering = ('name',)

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
    state = models.CharField(max_length=3, blank=True)
    postcode = models.CharField(max_length=4, blank=True)
    housePrice = models.IntegerField(default=0)
    houseRentalPrice = models.IntegerField(default=0)
    unitPrice = models.IntegerField(default=0)
    unitRentalPrice = models.IntegerField(default=0)
    timeToCbdPublic = models.CharField(max_length=100, blank=True)
    timeToCbdPrivate = models.CharField(max_length=100, blank=True)
    averageSalary = models.IntegerField(default=0)
    description = models.CharField(max_length=500, blank=True)
    longDescription = models.CharField(max_length=3300, blank=True)
    hospitals = models.ManyToManyField(Hospital, blank=True)
    schools = models.ManyToManyField(School, blank=True)
    suburbImages = ArrayField(models.CharField(max_length=2000), default=[])
    ageDistribution = models.ManyToManyField(AgePop, blank=True)

    class Meta:
        ordering = ('name',)
