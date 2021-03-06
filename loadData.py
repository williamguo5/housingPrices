#!/usr/local/bin/python3

import sys,os

# Full path to your django project directory
dirName=os.path.dirname(os.path.abspath(__file__))

# Full path and name to your csv files
schools_filepathname=dirName + "/Data/schools/schools.txt"
realEstate_filepathname=dirName + "/Data/realEstate/suburbPricing.csv"
travel_filepathname=dirName + "/Data/travel/travel.csv"
wages_filepathname=dirName + "/Data/wages.csv"
descriptions_filepathname=dirName + "/Data/suburbDescriptions.txt"
hospitals_filepathname=dirName + "/Data/hospitals/hospitals.csv"
suburbImages_filepathname=dirName + "/Data/suburbImages/suburbImages.csv"
age_filepathname=dirName + "/Data/age.csv"

sys.path.append(dirName)
os.environ['DJANGO_SETTINGS_MODULE'] = 'HouseLife.settings'
import django
django.setup()


from suburbs.models import Hospital, School, Suburb, AgePop
import csv,math,re

realEstateReader = csv.reader(open(realEstate_filepathname), delimiter=',', quotechar='"')
next(realEstateReader, None) # Skip first line, field names
for row in realEstateReader:
    suburb = Suburb.objects.create(
        name = row[0],
        state = "NSW",
        postcode = row[1],
        housePrice = round(float(row[2])),
        houseRentalPrice = round(float(row[3])),
        unitPrice = round(float(row[4])),
        unitRentalPrice = round(float(row[5])),
        )

descriptionReader = csv.reader(open(descriptions_filepathname), delimiter='|', quotechar='"')
next(descriptionReader, None)
for row in descriptionReader:
    suburb = Suburb.objects.get(name__iexact=row[0])
    suburb.description = row[1]
    suburb.longDescription = row[2]
    suburb.save()

hospitalReader = csv.reader(open(hospitals_filepathname), delimiter=',', quotechar='"')
next(hospitalReader, None)
for row in hospitalReader:
    if (Suburb.objects.filter(name__iexact=row[2])):
        hospital = Hospital.objects.create(
            name = row[0],
            street = row[1],
            phone = row[4],
            lhd = row[6]
            )
        suburb = Suburb.objects.get(name__iexact=row[2])
        suburb.hospitals.add(hospital)
        suburb.save()

wagesReader = csv.reader(open(wages_filepathname), delimiter=',', quotechar='"')
for row in wagesReader:
    row[1] = (row[1].split('-', 1)[0]).strip()
    suburbs = Suburb.objects.filter(name__iexact=row[1])
    if suburbs.count() > 0:
        suburb = suburbs[0]
        row[19] = row[19].replace("\"","")
        row[19] = row[19].replace(",","")
        suburb.averageSalary = round(float(row[19]))
        suburb.save()

travelReader = csv.reader(open(travel_filepathname), delimiter=',', quotechar='"')
next(travelReader, None)
for row in travelReader:
    suburb = Suburb.objects.get(name__iexact=row[0])
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
    suburb = Suburb.objects.get(name__iexact=row[8])
    suburb.schools.add(school)
    suburb.save()

suburbImagesReader = csv.reader(open(suburbImages_filepathname), delimiter=',', quotechar='"')
for row in suburbImagesReader:
    suburb = Suburb.objects.get(name__iexact=row[0])
    for i in range(1, len(row)):
        suburb.suburbImages.append(row[i])
    suburb.save()

ageReader = csv.reader(open(age_filepathname), delimiter=',', quotechar='"')
next(ageReader, None)
for row in ageReader:
    suburbs = Suburb.objects.filter(name__iexact=row[0])
    if suburbs.count() > 0:
        agePop = AgePop.objects.create(
            zeroToTen = row[1],
            tenToNineteen = row[2],
            twentyToTwentyNine = row[3],
            thirtyToThirtyNine = row[4],
            fortyToFortyNine = row[5],
            fiftyToFiftyNine = row[6],
            sixtyToSixtyNine = row[7],
            seventyToSeventyNine = row[8],
            eightyPlus = row[9]
            )
        suburb = suburbs[0]
        suburb.ageDistribution.add(agePop)
        suburb.save()