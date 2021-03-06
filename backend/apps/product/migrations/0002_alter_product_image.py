# Generated by Django 3.2.13 on 2022-05-18 16:09

import config.settings.common.path
from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=imagekit.models.fields.ProcessedImageField(blank=True, max_length=512, null=True, upload_to=config.settings.common.path._default_media_path, verbose_name='Image'),
        ),
    ]
