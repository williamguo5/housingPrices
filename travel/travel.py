#!/usr/bin/python

#http://stackoverflow.com/questions/23306653/python-accessing-nested-json-data
#NB: need google API key for transit request

import urllib2, json
import re, csv

# output array
output = []

# get file with data name
with open('../test.txt') as f:
    lines = f.readlines()

for items in lines:
		new_list = []

		suburb = items.rstrip('\n')
		new_list.append(suburb)
		suburb = re.sub(' ', '+', suburb)

		response = urllib2.urlopen('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+suburb+'+NSW&destinations=Sydney+NSW&mode=driving&language=en')
		data = json.load(response)   
		new_list.append(str(data['rows'][0]['elements'][0]['duration']['text']))
		#print data['rows'][0]['elements'][0]['distance']['text']

		response = urllib2.urlopen('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+suburb+'+NSW&destinations=Sydney+NSW&mode=transit&language=en&key=AIzaSyC8Pah10IPrXlZo9q_yheta2J0nYZ7qp5c')
		data = json.load(response)
		new_list.append(str(data['rows'][0]['elements'][0]['duration']['text']))

		output.append(new_list)

print output

with open('travel.csv', 'wb') as fp:
    a = csv.writer(fp, delimiter=',')
    a.writerows(output)