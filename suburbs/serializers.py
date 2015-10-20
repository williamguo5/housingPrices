from rest_framework import serializers
from suburbs.models import School, Suburb

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('name', 'rank', 'government', 'primary', 'secondary', 'religion', 'gender', 'street')

class SuburbSerializer(serializers.ModelSerializer):
    schools = SchoolSerializer(many=True, read_only=True)
    class Meta:
        model = Suburb
        fields = ('name', 'state', 'postcode', 'housePrice', 'houseRentalPrice', 'unitPrice', 'unitRentalPrice', 'timeToCbdPublic', 'timeToCbdPrivate', 'averageSalary', 'description', 'longDescription', 'schools')

class SimpleSuburbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suburb
        fields = ('name', 'housePrice', 'houseRentalPrice', 'unitPrice', 'unitRentalPrice', 'timeToCbdPublic', 'timeToCbdPrivate', 'averageSalary')