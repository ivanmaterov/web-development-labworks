from invoke import task

from . import common

##############################################################################
# Build project locally
##############################################################################


@task
def install_requirements(context, env='local'):
    """Install local development requirements"""
    common.success(f'Install requirements with pip from {env}.txt locally')
    context.run(f'pip install -r requirements/{env}.txt')


@task
def pip_compile(context, update=False):
    """Compile requirements with pip-compile."""
    common.success('Compile requirements with pip-compile')
    upgrade = '-U' if update else ''
    in_files = [
        'local.in',
    ]
    for in_file in in_files:
        with context.cd('requirements'):
            context.run(f'pip-compile -q {in_file} {upgrade}')
