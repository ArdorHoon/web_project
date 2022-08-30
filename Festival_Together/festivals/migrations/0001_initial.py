# Generated by Django 2.1 on 2019-11-29 13:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Festival',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=30)),
                ('date', models.DateField(default=datetime.date.today)),
                ('place', models.CharField(default='', max_length=30)),
                ('price', models.IntegerField(blank=True, default=0, null=True)),
                ('pic', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
    ]
