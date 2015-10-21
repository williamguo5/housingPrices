import urllib, urllib2
import json
import re, csv
import time

# output array
output = []

# get file with data name
with open('../Data/suburbNames.txt') as f:
    lines = f.readlines()

for items in lines:
	new_list = []

	suburb = items.rstrip('\n')
	# status
	print ('adding : '+suburb)
	new_list.append(suburb)
	suburb = re.sub(' ', '+', suburb)

	fetcher = urllib2.build_opener()
	searchTerm = suburb+'+AND+SYDNEY+site:domain.com.au'
	startIndex = 0
	index = 0
	refresh = 0

	while startIndex < 5:
		searchUrl = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + searchTerm + "&start=" + str(startIndex) + "&imgtype=photo"
		f = fetcher.open(searchUrl)
		deserialized_output = json.load(f)
		while index < 4 and refresh < 20:
			try:
				imageUrl = deserialized_output['responseData']['results'][index]['unescapedUrl']
				#file = cStringIO.StringIO(urllib.urlopen(imageUrl).read())
				#img = Image.open(file)
				#print imageUrl
				new_list.append(str(imageUrl))
				index += 1

			except:
				time.sleep(20)
				f = fetcher.open(searchUrl)
				deserialized_output = json.load(f)
				refresh += 1
				if refresh == 20:
					new_list.append('empty')
		index = 0
		refresh = 0
		startIndex += 4



	output.append(new_list)


with open('suburb_images.csv', 'wb') as fp:
    a = csv.writer(fp, delimiter=',')
    a.writerows(output)
