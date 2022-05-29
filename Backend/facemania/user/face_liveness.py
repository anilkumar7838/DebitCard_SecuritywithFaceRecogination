import cv2
import mediapipe as mp
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils
import os
import numpy as np
def getCoordinates(pt,img_width,img_height):
    """
    Converts a point from the image to the coordinates in the video
    """
    x = int(pt.x*img_width)
    y = int(pt.y*img_height)
    return x,y


def getPose(d1,d2,d3,d4):
    """
    Returns the pose of the user based on the distance between the ears and the nose
    """
    threshold = abs(d1-d2)*2
    if abs(d3-d4)>threshold:
        if d3>d4:
            return "right"
        else:
            return "left"
    return None

def getDistance(pt1,pt2,width,height):
    """
    Returns the distance between two points
    """
    x1,y1 = getCoordinates(pt1,width,height)
    x2,y2 = getCoordinates(pt2,width,height)
    return np.sqrt((x1-x2)**2+(y1-y2)**2)

def check_movement(img1,img2):
    """
    Checks whether the user has moved the face or not 
    """
    with mp_face_detection.FaceDetection(
        model_selection=1, min_detection_confidence=0.5) as face_detection:
            # Convert the BGR image to RGB and process it with MediaPipe Face Detection.
            img1.flags.writeable = False
            img2.flags.writeable = False
            results1 = face_detection.process(cv2.cvtColor(img1, cv2.COLOR_BGR2RGB))
            results2 = face_detection.process(cv2.cvtColor(img2, cv2.COLOR_BGR2RGB))
            height,width,_ = img1.shape
            # Draw face detections of each face.
            for detection in results1.detections:
                RE = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EAR_TRAGION)
                LE = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EAR_TRAGION)
                N = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.NOSE_TIP)
                M = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.MOUTH_CENTER)
            d1 = getDistance(LE,N,width,height)
            d2 = getDistance(RE,N,width,height)
            for detection in results2.detections:
                RE = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.RIGHT_EAR_TRAGION)
                LE = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.LEFT_EAR_TRAGION)
                N = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.NOSE_TIP)
                M = mp_face_detection.get_key_point(detection, mp_face_detection.FaceKeyPoint.MOUTH_CENTER)
            d3 = getDistance(LE,N,width,height)
            d4 = getDistance(RE,N,width,height)
            return getPose(d1,d2,d3,d4)

