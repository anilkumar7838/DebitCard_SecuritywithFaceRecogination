from django.db import models
from django.utils import timezone
# Create your models here.

class User(models.Model):
    class Meta:
        db_table = "users"
    id = models.AutoField(primary_key=True)
    AccountHolderName =  models.CharField(max_length=100, null=False)  # name of customer
    BankName = models.CharField(max_length=100, null=False)  # name of the bank
    Branch = models.CharField(max_length=100, null=False)  # name of bank's branch
    Email = models.EmailField(max_length=100, null=True, default="",blank=True)  # e-mail of customer
    PhoneNumber = models.CharField(max_length=15,null=False)  # phone number of customer
    RelationField = models.CharField(max_length=30, null=True, default="",blank=True)  # information regarding 'son/daughter/husband of' of the user
    CIFNumber = models.CharField(max_length=20, null=False) # customer information file number
    MICRNumber = models.CharField(max_length=20, null=False)  # MICR code
    AccountType = models.CharField(max_length=100, null=False)  # type of account of the customer
    DOB = models.DateField(null=True, blank=True)  # date of birth of the customer
    Address = models.TextField()  # address of the customer
    AccountNumber = models.CharField(max_length=18, null=False)  # account number of the customer 
    IFSC_code = models.CharField(max_length=18)  # IFSC code of the bank
    Pin = models.CharField(max_length=6, null=False)  # PIN of the card
    Picture = models.ImageField(upload_to='pictures/')  # picture of the customer
    Token = models.CharField(max_length=100, null=True,blank=True)  # auth token of user
    Token_created_at = models.DateTimeField(null=True,blank=True,default=timezone.now) # time when auth token is created
    TotalBalance = models.FloatField(null=True,blank=True,default=0)  # total balance in the account of the customer
    CreateAt = models.DateTimeField(default = timezone.now)  # time when the account is created 


    def __str__(self):
        return self.AccountHolderName
    
    def __repr__(self):
        return self.AccountHolderName