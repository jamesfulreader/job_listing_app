from django.shortcuts import render
from rest_framework import generics, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from .models import Company, Job
from .serializers import CompanySerializer, JobSerializer, UserSerializer

# Create your views here.
class CompanyListCreate(generics.ListCreateAPIView):
  queryset = Company.objects.all()
  serializer_class = CompanySerializer
  permission_classes = [IsAuthenticatedOrReadOnly]
  filter_backends = [filters.SearchFilter, filters.OrderingFilter]
  search_fields = ['name', 'description']
  ordering_fields = ['name']

class CompanyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Company.objects.all()
  permission_classes = [IsAuthenticatedOrReadOnly]
  serializer_class = CompanySerializer

class JobListCreate(generics.ListCreateAPIView):
  queryset = Job.objects.all()
  serializer_class = JobSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]
  filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
  filterset_fields = ['position_type', 'company__name']
  search_fields = ['title', 'description', 'location']
  ordering_fields = ['title', 'salary_min', 'salary_max']

class JobRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Job.objects.all()
  serializer_class = JobSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

class GetUserView(APIView):
  def get(self, request, user_id):
    User = get_user_model()
    try:
      user = User.objects.get(id=user_id)
      serializer = UserSerializer(user)
      return Response(serializer.data)
    except:
      return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            # Get the user based on the provided username
            User = get_user_model()
            user = User.objects.filter(username=request.data.get('username')).first()
            if user:
                response.data['user_id'] = user.id
            else:
                # This shouldn't happen if the token was issued successfully,
                # but we'll handle it just in case
                return Response(
                    {"error": "User not found"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return response