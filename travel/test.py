import csv
with open('test.csv', 'wb') as fp:
    a = csv.writer(fp, delimiter=',')
    data = [['Me', 'You'],
            ['293', '219'],
            ['54', '13']]
    a.writerows(data)