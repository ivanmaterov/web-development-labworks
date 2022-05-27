import os

import django

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
# django.setup()

from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework.authentication import TokenAuthentication
from django.db import close_old_connections

class TokenCustomAuthentication(TokenAuthentication):
    @database_sync_to_async
    def authenticate_credentials(self, key):
        return super().authenticate_credentials(key)


class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()
        try:
            token_key = (dict((x.split('=') for x in scope['query_string'].decode().split("&")))).get('token', None)
        except ValueError:
            token_key = None
        print(token_key)
        user_and_token = await TokenCustomAuthentication().authenticate_credentials(token_key)
        scope['user'] = user_and_token[0]
        return await super().__call__(scope, receive, send)


def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(inner)
