from click import command
from invoke import task

from . import common, start, system


@task
def manage(context, command, watchers=()):
    """Run ``manage.py`` command.
    docker-compose run --rm web python3 manage.py <command>
    Args:
        context: Invoke context
        command: Manage command
        watchers: Automated responders to command
    """
    return start.run_python(
        context,
        ' '.join(['manage.py', command]),
        watchers=watchers,
    )


def loadfixture(fixtures=[]):
    """Load fixture using manage invoke."""
    import ipdb; ipdb.set_trace()
    manage(command=' '.join(['loaddata', *fixtures]))

@task
def makemigrations(context):
    """Run makemigrations command and chown created migrations."""
    common.success('Django: Make migrations')
    manage(context, 'makemigrations')
    system.chown(context)


@task
def check_new_migrations(context):
    """Check if there is new migrations or not."""
    common.success('Checking migrations')
    manage(context, 'makemigrations --check --dry-run')


@task
def migrate(context):
    """Run ``migrate`` command."""
    common.success('Django: Apply migrations')
    manage(context, 'migrate')


@task
def run(context):
    """Run development web-server."""

    # start dependencies (so even in local mode this command
    # is working successfully
    # if you need more default services to be started define them
    # below, like celery, etc.
    common.success('Running web app')
    manage(
        context,
        'runserver_plus 0.0.0.0:8000 --keep-meta-shutdown --reloader-type stat',
    )

@task
def run_channels_server(context):
    """Run development web-server for django-channels."""

    common.success('Running web app')
    manage(
        context,
        'runserver 0.0.0.0:8000',
    )

@task
def shell(context, params=''):
    """Shortcut for manage.py shell_plus command.
    Additional params available here:
        https://django-extensions.readthedocs.io/en/latest/shell_plus.html
    """
    common.success('Entering Django Shell')
    manage(context, f'shell_plus --ipython {params}')


@task
def dbshell(context):
    """Open postgresql shell with credentials from either local or dev env."""
    common.success('Entering DB shell')
    manage(context, 'dbshell')
