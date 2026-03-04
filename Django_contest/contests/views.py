from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
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

    def get_permissions(self):
        # Якщо користувач реєструється (метод POST/create) — дозволяємо всім
        if self.action == 'create':
            return [permissions.AllowAny()]
        # Для всіх інших дій (перегляд списку користувачів тощо) — тільки авторизованим
        return [permissions.IsAuthenticated()]

    def get_authenticators(self):
        # Вимикаємо перевірку токенів для створення акаунту
        if self.request and self.request.method == 'POST':
            return []
        return super().get_authenticators()
    
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

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def for_judging(self, request):
        # Показуємо лише ті роботи, які цей конкретний член журі ще не оцінював
        entries = Entry.objects.exclude(scores__jury=request.user)
        serializer = self.get_serializer(entries, many=True)
        return Response(serializer.data)
    
class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    
    def perform_create(self, serializer):
        serializer.save(jury=self.request.user)

