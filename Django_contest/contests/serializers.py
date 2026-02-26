from rest_framework import serializers
from .models import Contest, Entry, Score, User, ContactRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class ScoreSerializer(serializers.ModelSerializer):
    jury_name = serializers.ReadOnlyField(source='jury.username')

    class Meta:
        model = Score
        fields = [
            'id', 'entry', 'jury', 'jury_name', 
            'composition', 'technique', 'creativity', 
            'topic_match', 'comment', 'created_at'
        ]

class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = '__all__'

class EntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    scores = ScoreSerializer(many=True, read_only=True) 

    class Meta:
        model = Entry
        fields = [
            'id', 'user', 'contest', 'image', 
            'is_premium', 'total_score', 'scores', 'created_at'
        ]

class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'
        
        