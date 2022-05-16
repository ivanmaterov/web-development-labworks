from invoke import task

from . import common

##############################################################################
# Build project locally
##############################################################################


@task
def install_requirements(context, env='local'):
    """Install local development requirements"""
    common.success(f'Install requirements with pip from {env}.txt')
    context.run(f'pip install -r requirements/{env}.txt')
