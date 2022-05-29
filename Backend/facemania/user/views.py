from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
import cv2
from user.models import User
import numpy as np
import uuid
import datetime
from user.face_verification import verify_face
from django.conf import settings
import os
from user.face_liveness import check_movement


@api_view(['POST'])
def loginFace(request):
    """
    Authenticating a person using face verification
    """
    response = Response({},status=200)
    try:
        username = request.data['username']
        faceData = request.data['faceData']
        faceData2 = request.data['faceData2']
        width = request.data['width']
        height = request.data['height']
        pose = request.data['pose']
        faceData = np.array(faceData).reshape((height,width,-1)).astype('uint8')
        faceData = cv2.cvtColor(faceData, cv2.COLOR_RGB2BGR)
        faceData2 = np.array(faceData2).reshape((height,width,-1)).astype('uint8')
        faceData2 = cv2.cvtColor(faceData2, cv2.COLOR_RGB2BGR)
        fname = os.path.join(settings.BASE_DIR, f'user/temp/{uuid.uuid1().hex}.jpg')
        fname2 = os.path.join(settings.BASE_DIR, f'user/temp/{uuid.uuid1().hex}.jpg')
        cv2.imwrite(fname, faceData)
        cv2.imwrite(fname2, faceData2)
        user = User.objects.filter(AccountNumber=username)
        if not user:
            response = Response({"success":"False","message": "User not found"},status=200)
        user = user.first()
        movement = check_movement(faceData,faceData2)
        if movement==pose:
            if verify_face(fname, user.Picture.url):
                user.Token = uuid.uuid1().hex
                user.Token_created_at = datetime.datetime.now()
                user.save()
                response = Response({'success':True, 'message':'Login Successful',"user":{"name":user.AccountHolderName,"AccountNumber":user.AccountNumber,"token":user.Token}},status=200)
            else:
                response = Response({"success": False,"message":"Face didn't matched"},status=200)
        else:
            response = Response({"success":"False","message": "Liveness failed"},status=200)
    except Exception as e:
        response = Response({"success":False,"message":"Internal Server Error","details":str(e)},status=500)
    finally:
        if os.path.exists(fname):
            os.remove(fname)
        if os.path.exists(fname2):
            os.remove(fname2)
        return response
        
@api_view(["POST"])
def loginPin(request):
    """
    Authenticating a person using PIN number of card
    """
    try:
        username = request.data['username']
        pin = request.data['pin']
        user = User.objects.filter(AccountNumber=username, Pin=pin)
        if not user:
            return Response({"success":False,"message": "Username or PIN is incorrect"},status=200)
        else:
            user = user.first()
            user.Token = uuid.uuid1().hex
            user.Token_created_at = datetime.datetime.now()
            user.save()
            return Response({"success":True,"message":"You are logged in successfully","user":{"token":user.Token,"AccountNumber":user.AccountNumber,"name":user.AccountHolderName}},status=200)
    except Exception as e:
        return Response({"success":False,"message": "Internal server error","details":str(e)},status=500)

@api_view(["GET"])
def test(request):
    return Response({"success":True,"message":"Test Successful"})