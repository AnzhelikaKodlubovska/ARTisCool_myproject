from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Contest, Entry, ContactRequest, Score

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'is_staff')
    
    fieldsets = UserAdmin.fieldsets + (
        ('Додаткова інформація', {'fields': ('role',)}),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Додаткова інформація', {'fields': ('role',)}),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(Score)
admin.site.register(Contest)
admin.site.register(Entry)
admin.site.register(ContactRequest)