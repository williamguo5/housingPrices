
# Full path and name to your csv file
schools_filepathname="/Users/samuelwemyss/Projects/SENG2021/schools/schools.txt"
realEstate_filepathname="/Users/samuelwemyss/Projects/SENG2021/realEstate/suburbPricing.csv"

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
dataReader = csv.reader(open(schools_filepathname), delimiter='|', quotechar='"')

for row in dataReader:
    if row[0] != 'RANK': # Ignore the header row, import everything else
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

        suburb_set = Suburb.objects.filter(name=row[8])
        if suburb_set.exists():
            suburb = suburb_set[0]
        else:
            suburb = Suburb()
            suburb.name = row[8]
            suburb.state = row[9]
            suburb.postcode = row[10]
            suburb.housePrice = 0
            suburb.unitPrice = 0
            suburb.timeToCBD = ""
            suburb.save()
        suburb.schools.add(school)
        suburb.save()