# Generated by Django 4.2.2 on 2024-05-06 03:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_typeofuser"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="type_of_user",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="app.typeofuser",
            ),
            preserve_default=False,
        ),
    ]