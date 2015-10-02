from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from suburbs.models import Suburb
from suburbs.serializers import SuburbSerializer


@api_view(['GET', 'POST'])
def suburb_list(request, format=None):
    """
    List all suburbs, or create a new suburb.
    """
    if request.method == 'GET':
        suburbs = Suburb.objects.all()
        serializer = SuburbSerializer(suburbs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SuburbSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def suburb_detail(request, pk, format=None):
    """
    Retrieve, update or delete a suburb instance.
    """
    try:
        suburb = Suburb.objects.get(pk=pk)
    except Suburb.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SuburbSerializer(suburb)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SuburbSerializer(suburb, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        suburb.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

