from django.urls import path
from . import views
urlpatterns = [
    path("login/face", views.loginFace, name="login_face"),
    path("login/pin", views.loginPin, name="login_pin"),
    path("test",views.test,name="test")
]