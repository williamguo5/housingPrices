#!/usr/local/bin/python3

import sys,os

# Full path and name to your csv file
dirName=os.path.dirname(os.path.abspath(__file__))
schools_filepathname=dirName + "/Data/schools/schools.txt"
realEstate_filepathname=dirName + "/Data/realEstate/suburbPricing.csv"
travel_filepathname=dirName + "/Data/travel/travel.csv"
wages_filepathname=dirName + "/Data/wages.csv"

# Full path to your django project directory
your_djangoproject_home=dirName

sys.path.append(your_djangoproject_home)
os.environ['DJANGO_SETTINGS_MODULE'] = 'HouseLife.settings'
import django
django.setup()


from suburbs.models import School
from suburbs.models import Suburb

import csv
import math
import re

realEstateReader = csv.reader(open(realEstate_filepathname), delimiter=',', quotechar='"')
next(realEstateReader, None)
for row in realEstateReader:
    suburb = Suburb.objects.create(
        name = row[0],
        state = "NSW",
        housePrice = round(float(row[1])),
        houseRentalPrice = round(float(row[2])),
        unitPrice = round(float(row[3])),
        unitRentalPrice = round(float(row[4])),
        )

wagesReader = csv.reader(open(wages_filepathname), delimiter=',', quotechar='"')
for row in wagesReader:
    row[1] = (row[1].split('-', 1)[0]).strip()
    suburbs = Suburb.objects.filter(name__iexact=row[1])
    if suburbs.count() > 0:
        suburb = suburbs[0]
        row[19] = row[19].replace("\"","")
        row[19] = row[19].replace(",","")
        suburb.averageSalary = round(float(row[19]))
        print(suburb.name)
        suburb.save()

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