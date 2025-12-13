

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('category', models.CharField(choices=[('Technical', 'Technical'), ('Financial', 'Financial'), ('Product', 'Product')], default='Technical', max_length=20)),
                ('status', models.CharField(choices=[('New', 'New'), ('Under Review', 'Under Review'), ('Resolved', 'Resolved')], default='New', max_length=20)),
                ('attachment', models.FileField(blank=True, null=True, upload_to='ticket_attachments/')),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('createdBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
