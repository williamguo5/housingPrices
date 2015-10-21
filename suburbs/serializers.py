from rest_framework import serializers
from suburbs.models import School, Suburb, Hospital, AgePop

class AgePopSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgePop
        fields = ('zeroToTen', 'tenToNineteen', 'twentyToTwentyNine', 'thirtyToThirtyNine', 'fortyToFortyNine', 'fiftyToFiftyNine', 'sixtyToSixtyNine', 'seventyToSeventyNine', 'eightyPlus')

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('name', 'street', 'phone', 'lhd')

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('name', 'rank', 'government', 'primary', 'secondary', 'religion', 'gender', 'street')

class SuburbSerializer(serializers.ModelSerializer):
    schools = SchoolSerializer(many=True, read_only=True)
    hospitals = HospitalSerializer(many=True, read_only=True)
    ageDistribution = AgePopSerializer(many=True, read_only=True)
    class Meta:
        model = Suburb
        fields = ('name', 'state', 'postcode', 'housePrice', 'houseRentalPrice', 'unitPrice', 'unitRentalPrice', 'timeToCbdPublic', 'timeToCbdPrivate', 'averageSalary', 'description', 'longDescription', 'hospitals', 'schools', 'suburbImages', 'ageDistribution')

class SimpleSuburbSerializer(serializers.ModelSerializer):
    ageDistribution = AgePopSerializer(many=True, read_only=True)
    class Meta:
        model = Suburb
        fields = ('name', 'housePrice', 'houseRentalPrice', 'unitPrice', 'unitRentalPrice', 'timeToCbdPublic', 'timeToCbdPrivate', 'averageSalary', 'description', 'longDescription', 'suburbImages', 'ageDistribution')
