#!/bin/sh

./manage.py makemigrations
./manage.py migrate
./manage.py flush
./loadData.py
echo "SUCESSSFULLY LOADED DATA"
./manage.py runserver