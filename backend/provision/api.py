from invoke import task

from . import common, django


@task
def generate_spec(context):
    """Run makemigrations command and chown created migrations."""
    common.success('Django: Make migrations')
    django.manage(
        context, 'spectacular --file schema.yaml --validate --fail-on-warn'
    )
