# Full path and name to your csv file
csv_filepathname="/Users/samuelwemyss/Projects/SENG2021/schools/schools.txt"
# Full path to your django project directory
your_djangoproject_home="/Users/samuelwemyss/Projects/SENG2021/schools/house_life/"

import sys,os
sys.path.append(your_djangoproject_home)
os.environ['DJANGO_SETTINGS_MODULE'] = 'house_life.settings'

from schools.models import School

import csv
dataReader = csv.reader(open(csv_filepathname), delimiter='|', quotechar='"')

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
        school.suburb = row[8]
        school.state = row[9]
        school.postcode = row[10]
        school.description = row[11]
        school.save()