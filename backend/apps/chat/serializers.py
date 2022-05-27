from .models import Room, Message
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
	"""Serializer for user chat."""
	class Meta:
		model = get_user_model()
		fields = ["id", "username", "email", "password"]
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		user = get_user_model(
			email=validated_data['email'],
			username=validated_data['username']
		)
		user.set_password(validated_data['password'])
		user.save()
		return user


class MessageSerializer(serializers.ModelSerializer):
	"""Serializer for chat message."""
	created_at_formatted = serializers.SerializerMethodField()
	user = UserSerializer()

	class Meta:
		model = Message
		exclude = []
		depth = 1

	def get_created_at_formatted(self, obj: Message):
		return obj.created.strftime("%d-%m-%Y %H:%M:%S")


class RoomSerializer(serializers.ModelSerializer):
	"""Serializer for char room."""
	last_message = serializers.SerializerMethodField()
	messages = MessageSerializer(many=True, read_only=True)

	class Meta:
		model = Room
		fields = [
			"pk",
			"name",
			"host",
			"messages",
			"current_users",
			"last_message"
		]
		depth = 1
		read_only_fields = [
			"messages",
			"last_message"
		]

	def get_last_message(self, obj: Room):
		return MessageSerializer(obj.messages.order_by('created').last()).data
