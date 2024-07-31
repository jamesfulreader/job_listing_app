from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
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