from django.db import models
from apps.utils.models import BaseModel
from django.utils.translation import gettext as _

from django.contrib.auth import get_user_model

class Room(BaseModel):
	"""Model for chat room."""
	name = models.CharField(
		max_length=255,
		null=False,
		blank=False,
		unique=True,
		verbose_name=_('Chat name'),
	)
	host = models.ForeignKey(
		get_user_model(),
		on_delete=models.CASCADE,
		related_name="rooms",
		verbose_name=_('Host'),
	)
	current_users = models.ManyToManyField(
		get_user_model(),
		related_name="current_rooms",
		blank=True,
		verbose_name=_('Current users'),
	)

	def __str__(self):
		return f"Room({self.name} {self.host})"
