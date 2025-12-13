

from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class Ticket(models.Model):

    CATEGORY_CHOICES = [
        ('Technical', 'Technical'),
        ('Financial', 'Financial'),
        ('Product', 'Product'),
    ]


    STATUS_CHOICES = [
        ('New', 'New'),
        ('Under Review', 'Under Review'),
        ('Resolved', 'Resolved'),
    ]


    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='Technical'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='New'
    )
    attachment = models.FileField(upload_to='ticket_attachments/', null=True, blank=True)
    
    createdBy = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tickets'
    )
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket #{self.id}: {self.title} ({self.status})"