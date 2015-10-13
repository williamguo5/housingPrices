#!/usr/local/bin/python3

# Full path and name to your csv file
schools_filepathname="/Users/samuelwemyss/Projects/SENG2021/Data/schools/schools.txt"
realEstate_filepathname="/Users/samuelwemyss/Projects/SENG2021/Data/realEstate/suburbPricing.csv"
travel_filepathname="/Users/samuelwemyss/Projects/SENG2021/Data/travel/travel.csv"

# Full path to your django project directory
your_djangoproject_home="/Users/samuelwemyss/Projects/SENG2021/"

import sys,os
sys.path.append(your_djangoproject_home)
os.environ['DJANGO_SETTINGS_MODULE'] = 'HouseLife.settings'
import django
django.setup()


from suburbs.models import School
from suburbs.models import Suburb

import csv
import math

realEstateReader = csv.reader(open(realEstate_filepathname), delimiter=',', quotechar='"')
next(realEstateReader, None)
for row in realEstateReader:
    suburb = Suburb.objects.create(
        name = row[0],
        state = "NSW",
        housePrice = round(float(row[1])),
        unitPrice = round(float(row[2]))
        )


travelReader = csv.reader(open(travel_filepathname), delimiter=',', quotechar='"')
next(travelReader, None)
for row in travelReader:
    suburb = Suburb.objects.get(name=row[0])
    suburb.timeToCbdPublic = row[2]
    suburb.timeToCbdPrivate = row[1]
    suburb.save()


schoolReader = csv.reader(open(schools_filepathname), delimiter='|', quotechar='"')
next(schoolReader, None)
for row in schoolReader:
    school = School.objects.create(
        rank = row[0],
        name = row[1],
        government = int(row[2]),
        primary = int(row[3]),
        secondary = int(row[4]),
        religion = row[5],
        gender = row[6],
        street = row[7],
        description = row[11]
        )
    suburb = Suburb.objects.get(name=row[8])
    suburb.postcode = row[10]
    suburb.schools.add(school)
    suburb.save()