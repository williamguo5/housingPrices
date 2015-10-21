#!/usr/bin/python
# This scripts gets data from the a formetted response from django rest client
# process the data assigns a heatmap value to the suburb based on data.
# The heatmap values are added onto base json file with suburb coordinates only.
# Output is printed to STDOUT.

import re, sys

def unitPriceHeatmap(price):
    price = int(price)
    # print price
    if price == 0:
        return 8
    if price < 400000:
        return 0
                                     
    elif price < 500000:             
        return 1
                                     
    elif price < 600000:            
        return 2
                                     
    elif price < 700000:            
        return 3
                                     
    elif price < 800000:            
        return 4
                                     
    elif price < 900000:            
        return 5
                                     
    elif price < 1000000:            
        return 6
                                     
    else:           
        return 7   

def housePriceHeatmap(price):
    price = int(price)
    if price == 0:
        return 8
    if price < 500000:
        return 0
                                     
    elif price < 750000:             
        return 1
                                     
    elif price < 1000000:            
        return 2
                                     
    elif price < 1250000:            
        return 3
                                     
    elif price < 1500000:            
        return 4
                                     
    elif price < 2000000:            
        return 5
                                     
    elif price < 3000000:            
        return 6
                                     
    else:           
        return 7                         
        

def houseRentPriceHeatmap(price):
    price = int(price)
    if price == 0:
        return 8
    if price < 400:
        return 0
                                    
    elif price < 500:               
        return 1
                                    
    elif price < 600:               
        return 2
                                    
    elif price < 700:               
        return 3
                                    
    elif price < 800:               
        return 4
                                    
    elif price < 900:               
        return 5
                                    
    elif price < 1000:              
        return 6
                                    
    else:           
        return 7

        
def unitRentPriceHeatmap(price):
    price = int(price)
    if price == 0:
        return 8
    if price < 400:
        return 0
                                     
    elif price < 450:                
        return 1
                                     
    elif price < 500:                
        return 2
                                     
    elif price < 550:                
        return 3
                                     
    elif price < 600:                
        return 4
                                     
    elif price < 650:                
        return 5
                                     
    elif price < 700:                
        return 6
                                     
    else:           
        return 7


def publicTravelTimeHeatmap(time):
    if time == -1:
        return 8
                                   
    elif time < 30:                
        return 0
                                   
    elif time < 45:                
        return 1
                                   
    elif time < 60:                
        return 2
                                   
    elif time < 75:                
        return 3
                                   
    elif time < 90:                
        return 4
                                   
    elif time < 105:               
        return 5
                                   
    elif time < 120:               
        return 6
                                   
    else:                          
        return 7
        
        
def privateTravelTimeHeatmap(time):
    if time == -1:
        return 8
                                   
    elif time < 10:                
        return 0
                                   
    elif time < 20:                
        return 1
                                   
    elif time < 30:                
        return 2
                                   
    elif time < 40:                
        return 3
                                   
    elif time < 50:                
        return 4
                                   
    elif time < 60:                
        return 5
                                   
    elif time < 70:                
        return 6
                                   
    else:                          
        return 7
        


suburbs = {}

with open("data_all_formatted2.json", "r") as d:
    suburb = ''
    for line in d:
        if re.search('"\w+":\"?[\d\w\s\/\-]+\"?,', line):
            if re.search('"name":"([\w\s\-]+)"', line):
                suburb = re.search('"name":"([\w\s\-]+)"', line).group(1)
                # print suburb
                suburbs[suburb] = {}
            else:
                regex_capture = re.search('"(\w+)":\"?([\d\w\s\/]+)\"?,', line)
                data_type = regex_capture.group(1)
                amount = regex_capture.group(2)
                if data_type == "timeToCbdPublic" or data_type == "timeToCbdPrivate":
                    if re.search("(\d+) hour[s]? (\d+) min[s]?", amount):
                        re_cap = re.search("(\d+) hour[s]? (\d+) min[s]?", amount)
                        amount = int(re_cap.group(1)) * 60
                        amount += int(re_cap.group(2))
                    elif re.search("(\d+) min[s]?", amount):
                        amount = int(re.search("(\d+) min[s]?", amount).group(1))
                    else:
                        amount = -1
                suburbs[suburb][data_type] = amount
               

for suburb in sorted(suburbs.iterkeys()):
    # print suburb
    for data_type in "numSchools", "housePrice", "houseRentalPrice", "unitPrice", "unitRentalPrice", "timeToCbdPublic", "timeToCbdPrivate":
        # print suburbs[suburb][data_type]
        if data_type == "numSchools":
            if int(suburbs[suburb][data_type]) > 6:
                suburbs[suburb][data_type] = 7
        if data_type == "housePrice":
            suburbs[suburb][data_type] = housePriceHeatmap(suburbs[suburb][data_type])
            
        if data_type == "houseRentalPrice":
            suburbs[suburb][data_type] = houseRentPriceHeatmap(suburbs[suburb][data_type])
            
        if data_type == "unitPrice":
            suburbs[suburb][data_type] = unitPriceHeatmap(suburbs[suburb][data_type])
            
        if data_type == "unitRentalPrice":
            suburbs[suburb][data_type] = unitRentPriceHeatmap(suburbs[suburb][data_type])
            
        if data_type == "timeToCbdPublic":
            suburbs[suburb][data_type] = publicTravelTimeHeatmap(suburbs[suburb][data_type])
            
        if data_type == "timeToCbdPrivate":
            suburbs[suburb][data_type] = privateTravelTimeHeatmap(suburbs[suburb][data_type])
            
# print suburbs

with open("suburb_coordinates.json", "r") as f:
    for line in f:
        line = line.rstrip("\n")
        if re.search('"name": "[\w\s\-]+"', line):
            suburb = re.search('"name": "([\w\s\-]+)"', line).group(1)
            suburb = str.upper(suburb)
            for data_type in "numSchools", "housePrice", "houseRentalPrice", "unitPrice", "unitRentalPrice", "timeToCbdPublic", "timeToCbdPrivate":
                line += ",\n            "
                line += '"' + data_type + '": ' + str(suburbs[suburb][data_type])
        print line
                
                