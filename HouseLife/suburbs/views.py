from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from suburbs.models import Suburb, School
from suburbs.serializers import SuburbSerializer, SchoolSerializer

import re

@api_view(['GET'])
def suburb_list(request, format=None):
    """
    List all suburbs.
    """
    suburbs = Suburb.objects.all()
    serializer = SuburbSerializer(suburbs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def suburb_detail(request, name, format=None):
    """
    Retrieve a suburb instance.
    """
    name = re.sub('_', ' ', name)
    try:
        suburb = Suburb.objects.get(name=name)
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
    serializer = SchoolSerializer(schools, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def school_detail(request, name, format=None):
    """
    Retrieve a school instance.
    """
    name = re.sub('_', ' ', name)
    try:
        school = School.objects.get(name=name)
    except Suburb.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SchoolSerializer(school)
    return Response(serializer.data)

