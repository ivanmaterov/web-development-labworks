import pytest

from apps.users.models import User
from apps.users.tests.factories import UserFactory


@pytest.fixture(autouse=True)
def _media_storage(settings, tmpdir):
    settings.MEDIA_ROOT = tmpdir.strpath


@pytest.fixture()
def user() -> User:
    """Fixture that returns user instance."""
    return UserFactory()
