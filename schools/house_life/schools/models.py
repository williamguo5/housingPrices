from django.db import models

class School(models.Model):
    rank = models.IntegerField()
    name = models.CharField(max_length=100)
    government = models.BooleanField(default=False)
    primary = models.BooleanField(default=False)
    secondary = models.BooleanField(default=False)
    religion = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    suburb = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postcode = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    class Meta:
        ordering = ('primary',)