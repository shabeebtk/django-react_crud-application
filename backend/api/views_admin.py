from .models import User
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
import jwt, datetime

class Admin_signin(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        admin_user = User.objects.filter(email=email).first()
        
        if not admin_user.is_superuser:
            raise AuthenticationFailed('user not found')
        
        if not admin_user.check_password(password):
            raise AuthenticationFailed('incorrect password')
        
        payload = {
            'id' : admin_user.id,
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat' : datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='admjwt', value=token, httponly=True)
        response.data = {
            'admjwt' : token,
            'message' : 'login success'
        }
        
        return response
        
        
class All_Users(APIView):
    def get(self, request):
        all_users = User.objects.filter(is_superuser=False)
        serializer = UserSerializer(all_users, many=True)
        return Response(serializer.data)
    

class AddUser(APIView):
    def post(self, request):
        email = request.data['email']
        phone = request.data['phone']
        
        print(request.data)
        
        if User.objects.filter(email=email).exists():
            return Response({ 'error' : 'email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(phone=phone).exists():
            return Response({ 'error' : 'phone number already registered' }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        

class EditUser(APIView):
    def post(self, request, user_id):
        email = request.data['email']
        phone = request.data['phone']
        user = User.objects.filter(id=user_id).first()
        
        print(request.data)
        
        if User.objects.filter(email=email).exists() and user.email != email:
            return Response({ 'error' : 'email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user:         
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.email = request.data['email']
            user.phone = request.data['phone']
            
            if 'profile_img' in request.data:
                user.profile_img = request.data['profile_img']
            

            user.save()
            seralizer = UserSerializer(user)
            return Response( seralizer.data )
        else:
            raise AuthenticationFailed('User not found')

        
class DeleteUser(APIView):
    def delete(self, request, user_id):
        try:
            user = User.objects.get(id = user_id)
            user.delete()
            return Response({
                "message" : "user deleted"
            }, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({
                "error" : 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)