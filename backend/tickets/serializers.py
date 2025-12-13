

from rest_framework import serializers
from .models import Ticket
from django.contrib.auth.models import User

class TicketSerializer(serializers.ModelSerializer):

    createdByName = serializers.CharField(source='createdBy.username', read_only=True)

    class Meta:
        model = Ticket
        fields = [
            'id', 'title', 'description', 'category', 'status', 
            'attachment', 'createdBy', 'createdByName', 'createdAt'
        ]

        read_only_fields = ('createdBy', 'status', 'createdAt')

class TicketStatusUpdateSerializer(serializers.ModelSerializer):
    """Serializer for Admin to update only the status."""
    class Meta:
        model = Ticket
        fields = ['status']

        read_only_fields = ['id', 'title', 'description', 'category', 'attachment', 'createdBy', 'createdAt']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user