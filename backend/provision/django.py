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
        " ".join(["manage.py", command]),
        watchers=watchers,
    )


@task
def makemigrations(context):
    """Run makemigrations command and chown created migrations."""
    common.success("Django: Make migrations")
    manage(context, "makemigrations")
    system.chown(context)


@task
def migrate(context):
    """Run ``migrate`` command."""
    common.success("Django: Apply migrations")
    manage(context, "migrate")


@task
def run(context):
    """Run development web-server."""

    # start dependencies (so even in local mode this command
    # is working successfully
    # if you need more default services to be started define them
    # below, like celery, etc.
    common.success("Running web app")
    manage(
        context,
        "runserver_plus 0.0.0.0:8000  --reloader-type stat",
    )


@task
def shell(context, params=""):
    """Shortcut for manage.py shell_plus command.
    Additional params available here:
        https://django-extensions.readthedocs.io/en/latest/shell_plus.html
    """
    common.success("Entering Django Shell")
    manage(context, f"shell_plus --ipython {params}")


@task
def dbshell(context):
    """Open postgresql shell with credentials from either local or dev env."""
    common.success("Entering DB shell")
    manage(context, "dbshell")
