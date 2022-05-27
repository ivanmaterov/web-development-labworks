from django.db import models
from apps.utils.models import BaseModel
from django.utils.translation import gettext as _

from django.contrib.auth import get_user_model
from . import Room


class Message(BaseModel):
	"""Model for chat message."""
	room = models.ForeignKey(
		Room,
		on_delete=models.CASCADE,
		related_name='messages',
		verbose_name=_('Message'),
	)
	text = models.TextField(
		max_length=500,
		verbose_name=_('Text'),
	)
	user = models.ForeignKey(
		get_user_model(),
		on_delete=models.CASCADE,
		related_name='messages',
		verbose_name=_('Message owner'),
	)

	def __str__(self):
		return f"Message({self.user} {self.room})"
