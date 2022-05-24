from django.db import models
from django.utils import timezone
# Create your models here.

class User(models.Model):
    class Meta:
        db_table = "users"
    id = models.PositiveIntegerField(primary_key=True)
    AccountHolderName =  models.CharField(max_length=100, null=False)
    BankName = models.CharField(max_length=100, null=False)
    Branch = models.CharField(max_length=100, null=False)
    AccountNumber = models.CharField(max_length=18, null=False)
    IFSC_code = models.CharField(max_length=18)
    Pin = models.CharField(max_length=6, null=False)
    picture = models.ImageField(upload_to='pictures/')
    token = models.CharField(max_length=100, null=True,blank=True)
    token_created_at = models.DateTimeField(null=True,blank=True)
    createAt = models.DateTimeField(default = timezone.now)


    def __str__(self):
        return self.AccountHolderName
    
    def __repr__(self):
        return self.AccountHolderName
