from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'password', 'profile_img']
        extra_kwargs = {
            'password': {'write_only' : True}
        }
        
    def create(self, validate_data):
        password = validate_data.pop('password', None)
        instance = self.Meta.model(**validate_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
    
