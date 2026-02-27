from django.db import models
from django.contrib.auth.models import  AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('teen', 'Teenager'),
        ('jury', 'Jury'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='teen')
    
# Модель Конкурсу
class Contest(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('judging', 'Judging'),
        ('finished', 'Finished'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')

    def __str__(self):
        return self.title

# 2. Модель Оцінок (Scores)
class Score(models.Model):
    entry = models.ForeignKey('Entry', on_delete=models.CASCADE, related_name='scores')
    jury = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'jury'})
    
    # Критерії оцінювання (від 1 до 10)
    composition = models.PositiveIntegerField(default=1)
    technique = models.PositiveIntegerField(default=1)
    creativity = models.PositiveIntegerField(default=1)
    topic_match = models.PositiveIntegerField(default=1)
    
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Один член журі може оцінити одну роботу лише один раз
        unique_together = ('entry', 'jury')

    def __str__(self):
        return f"Score by {self.jury.username} for {self.entry.id}"
    
# Модель Конкурсної роботи
class Entry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='entries')
    # Зробимо contest необов'язковим (null=True), якщо ти ще не реалізувала вибір конкурсу
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE, related_name='entries', null=True, blank=True)
    
    image = models.ImageField(upload_to='entries/')
    title = models.CharField(max_length=255, default="Без назви") # Додай назву роботи
    
    # Поля з твоєї красивої форми
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    age = models.IntegerField(null=True, blank=True)
    city = models.CharField(max_length=100, blank=True)
    
    is_premium = models.BooleanField(default=False)
    total_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"

# Модель Зворотного зв'язку (Контакти)
class ContactRequest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    is_processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
    
