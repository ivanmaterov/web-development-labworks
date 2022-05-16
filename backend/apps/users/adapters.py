from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.http import HttpRequest


class AccountAdapter(DefaultAccountAdapter):
    """Account adapter."""
    def is_open_for_signup(self, request: HttpRequest):
        """Is open for signup method."""
        return getattr(settings, 'ACCOUNT_ALLOW_REGISTRATION', True)


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    """Social account adapter."""
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any):
        """Is open for singup method"""
        return getattr(settings, 'ACCOUNT_ALLOW_REGISTRATION', True)
