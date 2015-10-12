from rest_framework import serializers
from suburbs.models import School
from suburbs.models import Suburb

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('rank', 'name', 'government', 'primary', 'secondary', 'religion', 'gender', 'street', 'description')

class SuburbSerializer(serializers.ModelSerializer):
    schools = SchoolSerializer(many=True, read_only=True)
    class Meta:
        model = Suburb
        fields = ('name', 'state', 'postcode', 'housePrice', 'unitPrice', 'timeToCbdPublic', 'timeToCbdPrivate', 'schools')

class SimpleSuburbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suburb
        fields = ('name', 'state', 'postcode', 'housePrice', 'unitPrice', 'timeToCbdPublic', 'timeToCbdPrivate')