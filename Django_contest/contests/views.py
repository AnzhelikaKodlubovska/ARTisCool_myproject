from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, permissions
from .models import Contest, Entry, Score, ContactRequest, User 
from .serializers import ( 
    ContestSerializer, 
    EntrySerializer, 
    ScoreSerializer, 
    ContactRequestSerializer,
    UserSerializer
)

class ContestViewSet(viewsets.ModelViewSet):
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
class UserViewSet(viewsets.ModelViewSet): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class ContactRequestViewSet(viewsets.ModelViewSet):
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

    # 1. Вказуємо, що створювати записи можуть лише авторизовані юзери
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # 2. Цей метод спрацьовує при POST запиті (створенні)
    def perform_create(self, serializer):
        # request.user береться з токена, який прислав React
        serializer.save(user=self.request.user)

class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

