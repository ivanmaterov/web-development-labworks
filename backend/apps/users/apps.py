from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    """UserConfig for users application."""
    name = "apps.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            # pylint: disable=unused-import
            import apps.users.signals  # noqa F401
        except ImportError:
            pass
