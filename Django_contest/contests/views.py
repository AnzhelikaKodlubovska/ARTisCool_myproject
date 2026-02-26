from django.shortcuts import render
from rest_framework import viewsets
from .models import Contest, Entry, Score, ContactRequest, User 
from .serializers import ( 
    ContestSerializer, 
    EntrySerializer, 
    ScoreSerializer, 
    ContactRequestSerializer,
    UserSerializer
)

class UserViewSet(viewsets.ModelViewSet): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class ContestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer

class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

class ContactRequestViewSet(viewsets.ModelViewSet):
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
