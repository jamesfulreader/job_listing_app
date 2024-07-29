from django.urls import path
from .views import CompanyListCreate, CompanyRetrieveUpdateDestroy, JobListCreate, JobRetrieveUpdateDestroy

urlpatterns = [
    path('companies/', CompanyListCreate.as_view(), name='company-list-create'),
    path('companies/<int:pk>/', CompanyRetrieveUpdateDestroy.as_view(), name='company-detail'),
    path('jobs/', JobListCreate.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobRetrieveUpdateDestroy.as_view(), name='job-detail'),
]
