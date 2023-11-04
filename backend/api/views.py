from .models import User
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
import jwt, datetime
from django.contrib.auth import authenticate
from rest_framework.parsers import FileUploadParser

# Create your views here.

class Register(APIView):
    def post(self, request):
        email = request.data['email']
        phone = request.data['phone']
        
        if User.objects.filter(email=email).exists():
            return Response({ 'error' : 'email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(phone=phone).exists():
            return Response({ 'error' : 'phone number already registered' }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class Login(APIView):
    def post(self, request):   
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.get(email = email)
        
        if not user:
            raise AuthenticationFailed('user not found')
        
        print(user.check_password(password))
                
        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')
        
        payload = {
            'id' : user.id,
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat' : datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt' : token,
            'message' : 'login success'
        }
        print(token)
        return response
    

class UserView(APIView):
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        
        print(token) 
        if not token:
            raise AuthenticationFailed('Unauthorized')
 
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('unauthorized')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)
            

class UserLogout(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message' : 'logout success'
        }
        return response

            
class UserEdit(APIView):
    def post(self, request):
        jwtToken = request.META.get('HTTP_AUTHORIZATION')
        
        try:
            payload = jwt.decode(jwtToken, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('unauthorized')
        
        user = User.objects.filter(id=payload['id']).first()
        
        check_email = User.objects.filter(email = request.data['email']).exists() and user.email != request.data['email']
        if check_email:
            return Response({
                "error" : "Email already registered"
            }, status=status.HTTP_400_BAD_REQUEST)
        
                
        if user:         
            user.first_name = request.data['firstName']
            user.last_name = request.data['lastName']
            user.email = request.data['email']
            user.phone = request.data['phone']
            
            if 'profileImage' in request.data:
                user.profile_img = request.data['profileImage']
            user.save()
            
            seralizer = UserSerializer(user)
            print(seralizer)
            return Response( seralizer.data )
        else:
            raise AuthenticationFailed('User not found')
        



        
        
        
        
        
