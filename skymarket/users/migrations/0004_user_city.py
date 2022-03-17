# Generated by Django 3.2.6 on 2022-03-17 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.CharField(blank=True, help_text='Введите город проживания, макс 64 символа', max_length=64, null=True, verbose_name='Город'),
        ),
    ]
