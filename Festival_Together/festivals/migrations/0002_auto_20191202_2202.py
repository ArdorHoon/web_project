# Generated by Django 2.1 on 2019-12-02 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('festivals', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='festival',
            name='pic',
            field=models.ImageField(blank=True, null=True, upload_to='festival'),
        ),
    ]
