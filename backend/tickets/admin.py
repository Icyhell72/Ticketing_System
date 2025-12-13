

from django.contrib import admin
from .models import Ticket

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'status', 'createdBy', 'createdAt')
    list_filter = ('category', 'status', 'createdAt')
    search_fields = ('title', 'description', 'createdBy__username')
    readonly_fields = ('createdAt', 'createdBy')

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.createdBy = request.user
        super().save_model(request, obj, form, change)
