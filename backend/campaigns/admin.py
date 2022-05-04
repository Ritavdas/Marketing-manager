from django.contrib import admin
from .models import *
# Register your models here.


# describing how our model will look in the Django-Admin
class CampaignModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_per_page = 1


class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ('email', 'campaign', 'created_at')
    search_fields = ('email', 'campaign__title', 'created_at') #__title as campaign if foreign key
    list_per_page = 1


admin.site.register(Campaign, CampaignModelAdmin)
admin.site.register(Subscriber, SubscriberModelAdmin)
