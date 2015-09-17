from rest_framework import serializers
from schools.models import School

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('rank', 'name', 'government', 'primary', 'secondary', 'religion', 'gender', 'street', 'suburb', 'state', 'postcode', 'description')