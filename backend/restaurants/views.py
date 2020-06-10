from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from restaurants.forms import MyUserCreationForm
from .models import Profile


class SignInView(APIView):
    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Wrong username/password.'}, status=status.HTTP_401_UNAUTHORIZED)
        login(request, user)
        return Response({})


class SignUpView(APIView):
    def post(self, request, format=None):
        form = MyUserCreationForm(request.data)
        if form.is_valid():
            new_user = form.save()
            return Response({})
        else:
            return Response({'errors': form.errors, 'non_field_errors': form.non_field_errors()}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def options(self, request, format=None):
        user = request.user
        group = user.groups.first()
        group_name = group.name[:-1]
        return Response({
            'role': group_name,
            'roleName': group_name.capitalize(),
            'name': request.user.first_name + " " + request.user.last_name,
        })


class LogOutView(APIView):
    def delete(self, request, format=None):
        logout(request)
        return Response({})


class RestaurantsView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': request.user.username,  # `django.contrib.auth.User` instance.
            'auth': request.auth,  # None
        }
        return Response(content)