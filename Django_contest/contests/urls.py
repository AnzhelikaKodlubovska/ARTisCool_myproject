from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContestViewSet, 
    EntryViewSet, 
    UserViewSet, 
    ScoreViewSet, 
    ContactRequestViewSet
)

router = DefaultRouter()
router.register(r'contests', ContestViewSet)
router.register(r'entries', EntryViewSet)
router.register(r'users', UserViewSet)
router.register(r'scores', ScoreViewSet)
router.register(r'contact', ContactRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

