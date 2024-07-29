from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Company, Job

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username", "password"]
    extra_kwargs = {"password": {"write_only": True}}

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user

class CompanySerializer(serializers.ModelSerializer):
  class Meta:
    model = Company
    fields = ["id", "name", "description", "contact_email", "contact_phone"]

class JobSerializer(serializers.ModelSerializer):
  company = CompanySerializer(read_only=True)
  company_id = serializers.PrimaryKeyRelatedField(
    queryset=Company.objects.all(),
    source='company',
    write_only=True
  )

  class Meta:
    model = Job
    fields = ["id", "title", "position_type", "location", "description", "salary_min", "salary_max", "company", "company_id"]

    def to_representation(self, instance):
      representation = super().to_representation(instance)
      if instance.salary_min and instance.salary_max:
          representation['salary_range'] = f"${instance.salary_min:,.2f} - ${instance.salary_max:,.2f}"
      elif instance.salary_min:
          representation['salary_range'] = f"From ${instance.salary_min:,.2f}"
      elif instance.salary_max:
          representation['salary_range'] = f"Up to ${instance.salary_max:,.2f}"
      else:
          representation['salary_range'] = "Salary not specified"
      return representation
