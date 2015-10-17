from rest_framework import serializers
from suburbs.models import School, Suburb, Hospital

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('name', 'street', 'phone', 'lhd')

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('rank', 'name', 'government', 'primary', 'secondary', 'religion', 'gender', 'street', 'description')

class SuburbSerializer(serializers.ModelSerializer):
    schools = SchoolSerializer(many=True, read_only=True)
    hospitals = HospitalSerializer(many=True, read_only=True)
    class Meta:
        model = Suburb
        fields = ('name', 'state', 'postcode', 'housePrice', 'houseRentalPrice', 'unitPrice', 'unitRentalPrice', 'timeToCbdPublic', 'timeToCbdPrivate', 'averageSalary', 'description', 'longDescription', 'hospitals', 'schools')

class SimpleSuburbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suburb
        fields = ('name', 'housePrice', 'houseRentalPrice', 'unitPrice', 'unitRentalPrice', 'timeToCbdPublic', 'timeToCbdPrivate', 'averageSalary')