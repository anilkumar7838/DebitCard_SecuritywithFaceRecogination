from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
import cv2
from user.models import User
import numpy as np
import uuid
import datetime
from user.face_verification import verify_face


@api_view(['POST'])
def loginFace(request):
    try:
        username = request.data['username']
        faceData = request.data['faceData']
        width = request.data['width']
        height = request.data['height']
        faceData = np.array(faceData).reshape((height,width,-1)).astype('uint8')
        faceData = cv2.cvtColor(faceData, cv2.COLOR_RGB2BGR)
        cv2.imwrite("user/temp/image.jpg", faceData)
        user = User.objects.filter(AccountNumber=username)
        if not user:
            return Response({"success":"False","message": "User not found"},status=200)
        user = user.first()
        if verify_face("user/temp/image.jpg", user.picture.url):
            user.token = uuid.uuid1().hex
            user.token_created_at = datetime.datetime.now()
            user.save()
            return Response({'success':True, 'message':'Login Successful',"user":{"name":user.AccountHolderName,"token":user.token}},status=200)
        return Response({"success": False,"message":"Face didn't matched"},status=200)
    except Exception as e:
        return Response({"success":False,"message":"Internal Server Error","details":str(e)},status=500)

        
@api_view(["POST"])
def loginPin(request):
    try:
        username = request.data['username']
        pin = request.data['pin']
        user = User.objects.filter(AccountNumber=username, Pin=pin)
        if not user:
            return Response({"success":False,"message": "Username or PIN is incorrect"},status=200)
        else:
            user.token = uuid.uuid1().hex
            user.token_created_at = datetime.datetime.now()
            user.save()
            return Response({"success":True,"message":"You are logged in successfully","user":{"token":user.token,"name":user.AccountHolderName}},status=200)
    except Exception as e:
        return Response({"success":False,"message": "Internal server error","details":str(e)},status=500)

@api_view(["GET"])
def test(request):
    return Response({"success":True,"message":"Test Successful"})