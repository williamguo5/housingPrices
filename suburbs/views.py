from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from suburbs.models import Suburb, School
from suburbs.serializers import SuburbSerializer, SchoolSerializer, SimpleSuburbSerializer

import re

@api_view(['GET'])
def suburb_list(request, format=None):
    """
    List all suburbs.
    """
    suburbs = Suburb.objects.all()
    if (request.query_params.get('name','')):
        suburbs = suburbs.filter(name__icontains=request.query_params.get('name',''))

    if (request.query_params.get('housePriceMax','')):
        suburbs = suburbs.filter(housePrice__lte=request.query_params.get('housePriceMax',''))
    if (request.query_params.get('housePriceMin','')):
        suburbs = suburbs.filter(housePrice__gte=request.query_params.get('housePriceMin',''))

    if (request.query_params.get('houseRentalPriceMax','')):
        suburbs = suburbs.filter(houseRentalPrice__lte=request.query_params.get('houseRentalPriceMax',''))
    if (request.query_params.get('houseRentalPriceMin','')):
        suburbs = suburbs.filter(houseRentalPrice__gte=request.query_params.get('houseRentalPriceMin',''))

    if (request.query_params.get('unitPriceMax','')):
        suburbs = suburbs.filter(unitPrice__lte=request.query_params.get('unitPriceMax',''))
    if (request.query_params.get('unitPriceMin','')):
        suburbs = suburbs.filter(unitPrice__gte=request.query_params.get('unitPriceMin',''))

    if (request.query_params.get('unitRentalPriceMax','')):
        suburbs = suburbs.filter(unitRentalPrice__lte=request.query_params.get('unitRentalPriceMax',''))
    if (request.query_params.get('unitRentalPriceMin','')):
        suburbs = suburbs.filter(unitRentalPrice__gte=request.query_params.get('unitRentalPriceMin',''))

    if (request.query_params.get('averageSalaryMax','')):
        suburbs = suburbs.filter(averageSalary__lte=request.query_params.get('averageSalaryMax',''))
    if (request.query_params.get('averageSalaryMin','')):
        suburbs = suburbs.filter(averageSalary__gte=request.query_params.get('averageSalaryMin',''))

    if (request.query_params.get('simple','')):
        if (request.query_params.get('simple','') == "False"):
            serializer = SimpleSuburbSerializer(suburbs, many=True)
        else:
            serializer = SuburbSerializer(suburbs, many=True)
    else:
        serializer = SuburbSerializer(suburbs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def suburb_detail(request, name, format=None):
    """
    Retrieve a suburb instance.
    """
    name = re.sub('_', ' ', name)
    try:
        suburb = Suburb.objects.get(name__iexact=name)
    except Suburb.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SuburbSerializer(suburb)
    return Response(serializer.data)

@api_view(['GET'])
def school_list(request, format=None):
    """
    List all schools.
    """
    schools = School.objects.all()

    if (request.query_params.get('name','')):
        schools = schools.filter(name__icontains=request.query_params.get('name',''))
    if (request.query_params.get('government','')):
        schools = schools.filter(government__exact=getBoolValue(request.query_params.get('government','')))
    if (request.query_params.get('primary','')):
        schools = schools.filter(primary__exact=getBoolValue(request.query_params.get('primary','')))
    if (request.query_params.get('secondary','')):
        schools = schools.filter(secondary__exact=getBoolValue(request.query_params.get('secondary','')))
    if (request.query_params.get('gender','')):
        schools = schools.filter(gender__iexact=request.query_params.get('gender',''))

    serializer = SchoolSerializer(schools, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def school_detail(request, name, format=None):
    """
    Retrieve a school instance.
    """
    name = re.sub('_', ' ', name)
    try:
        school = School.objects.get(name__iexact=name)
    except School.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SchoolSerializer(school)
    return Response(serializer.data)


def getBoolValue(val):
    if (val.upper() == "TRUE"):
            val = "1"
    elif (val.upper() == "FALSE"):
            val = "0"
    return val