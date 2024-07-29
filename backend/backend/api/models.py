from django.db import models

class Company(models.Model):
  name = models.CharField(max_length=250)
  description = models.TextField()
  contact_email = models.EmailField()
  contact_phone = models.CharField(max_length=20)

# Create your models here.
class Job(models.Model):
  JOB_TYPES = [
    ('Full-Time', 'Full-Time'),
    ('Part-Time', 'Part-Time'),
    ('Contract', 'Contract'),
  ]

  title = models.CharField(max_length=250)
  position_type = models.CharField(max_length=20, choices=JOB_TYPES)
  location = models.CharField(max_length=250)
  description = models.TextField()
  salary_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
  salary_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
  company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="jobs")

  def __str__(self) -> str:
    return f"{self.title} at {self.company.name}"
