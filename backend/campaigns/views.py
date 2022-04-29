from django.shortcuts import render
from rest_framework import generics, response, status
from .models import *
from .serializers import *
# Create your views here.

# Since we wanna show a list so we're inherting from listview


class CampaignListAPIView(generics.ListAPIView):
    serializer_class = CampaignSerializer

    # function that is used to query that records that will be returned in this list
    def get_queryset(self):
        # we want to return a query_Set . It is a set of records
        return Campaign.objects.all()


class CampaignDetailAPIView(generics.GenericAPIView):
    serializer_class = CampaignSerializer

    def get(self, request, slug):

        query_set = Campaign.objects.filter(slug=slug).first()

        if query_set:
            return response.Response(self.serializer_class(query_set).data)

        return response.Response('Not found', status=status.HTTP_404_NOT_FOUND)


class SubscribeToCampaignAPIView(generics.CreateAPIView):
    serializer_class = SubscriberSerializer
    
    def get_queryset(self):
        return Subscriber.objects.all()
