#!/usr/local/bin/python3

# Full path and name to your csv file
schools_filepathname="/Users/samuelwemyss/Projects/SENG2021/schools/schools.txt"
realEstate_filepathname="/Users/samuelwemyss/Projects/SENG2021/realEstate/suburbPricing.csv"
travel_filepathname="/Users/samuelwemyss/Projects/SENG2021/travel/travel.csv"

# Full path to your django project directory
your_djangoproject_home="/Users/samuelwemyss/Projects/SENG2021/HouseLife/"

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
    suburb = Suburb()
    suburb.name = row[0]
    suburb.state = "NSW"
    suburb.housePrice = round(float(row[1]))
    suburb.unitPrice = round(float(row[2]))
    suburb.save()


travelReader = csv.reader(open(travel_filepathname), delimiter=',', quotechar='"')
next(travelReader, None)
for row in travelReader:
    suburb = Suburb.objects.filter(name=row[0])[0]
    suburb.timeToCbdPublic = row[2]
    suburb.timeToCbdPrivate = row[1]
    suburb.save()


schoolReader = csv.reader(open(schools_filepathname), delimiter='|', quotechar='"')
next(schoolReader, None)
for row in schoolReader:
    school = School()
    school.rank = row[0]
    school.name = row[1]
    school.government = int(row[2])
    school.primary = int(row[3])
    school.secondary = int(row[4])
    school.religion = row[5]
    school.gender = row[6]
    school.street = row[7]
    school.description = row[11]
    school.save()
    suburb = Suburb.objects.filter(name=row[8])[0]
    suburb.postcode = row[10]
    suburb.schools.add(school)
    suburb.save()