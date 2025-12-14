

from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

from .models import Ticket
from .serializers import TicketSerializer, TicketStatusUpdateSerializer, UserRegistrationSerializer
from .permissions import RoleBasedPermission

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer

    permission_classes = [RoleBasedPermission] 
    

    def get_queryset(self):
        user = self.request.user
        

        if user.is_staff:
            queryset = Ticket.objects.all().order_by('-createdAt')

        else:
            queryset = Ticket.objects.filter(createdBy=user).order_by('-createdAt')


        category = self.request.query_params.get('category')
        status_filter = self.request.query_params.get('status')
        search_query = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category=category)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if search_query:

            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query)
            )
        
        return queryset


    def perform_create(self, serializer):

        serializer.save(createdBy=self.request.user)
        

    @action(detail=True, methods=['patch'], url_path='status', 
            permission_classes=[RoleBasedPermission]) 
    def update_status(self, request, pk=None):
        ticket = self.get_object()

        serializer = TicketStatusUpdateSerializer(ticket, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]