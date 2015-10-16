import urllib2, urllib
import simplejson, json
import cStringIO
import re, csv
from PIL import Image

# output array
output = []

# get file with data name
with open('suburbNames.txt') as f:
    lines = f.readlines()

for items in lines:
	new_list = []

	suburb = items.rstrip('\n')
	# status
	print 'adding : '+suburb
	new_list.append(suburb)
	suburb = re.sub(' ', '+', suburb)

	fetcher = urllib2.build_opener()
	searchTerm = suburb+'+SYDNEY'
	startIndex = 0

	while startIndex < 5:

		searchUrl = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + searchTerm + "&start=" + str(startIndex)
		f = fetcher.open(searchUrl)
		deserialized_output = simplejson.load(f)
		try:
			imageUrl = deserialized_output['responseData']['results'][0]['unescapedUrl']
			#file = cStringIO.StringIO(urllib.urlopen(imageUrl).read())
			#img = Image.open(file)
			#print imageUrl
			new_list.append(str(imageUrl))
		except:
			new_list.append('empty')


		startIndex += 1

	output.append(new_list)


with open('suburb_images.csv', 'wb') as fp:
    a = csv.writer(fp, delimiter=',')
    a.writerows(output)