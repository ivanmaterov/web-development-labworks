from invoke import task

from . import common

##############################################################################
# Containers start stop commands
##############################################################################

MAIN_CONTAINERS = [
    'django',
    'postgres',
    'mailhog',
]


def docker_compose_run(
    context, params: str, container: str, command: str, watchers=(),
):
    """Run ``command`` using docker-compose
    docker-compose run <params> <container> <command>
    Start container and run command in it.
    Used function so lately it can be extended to use different docker-compose
    files.
    Args:
        context: Invoke context
        params: Configuration params for docker compose
        container: Name of container to start
        command: Command to run in started container
        watchers: Automated responders to command
    """
    cmd = f'docker-compose run {params} {container} {command}'
    return context.run(cmd, watchers=watchers)


def up_containers(context, containers, detach=True, **kwargs):
    """Bring up containers and run them.
    Add `d` kwarg to run them in background.
    Args:
        context: Invoke context
        containers: Name of containers to start
        detach: To run them in background
    """
    if containers:
        common.success(f'Bring up {", ".join(containers)} containers')
    else:
        common.success('Bring up all containers')
    cmd = (
        f'docker-compose up '
        f'{"-d " if detach else ""}'
        f'{" ".join(containers)}'
    )
    context.run(cmd)


# pylint: disable=invalid-name
@task
def up(context):
    """Bring up main containers and start them."""
    up_containers(
        context,
        containers=MAIN_CONTAINERS,
        detach=True,
    )


@task
def clear(context):
    """Stop and remove all containers defined in docker-compose.
    Also remove images.
    """
    common.success('Clearing docker-compose')
    context.run('docker-compose rm -f')
    context.run('docker-compose down -v --rmi all --remove-orphans')


@task
def build(context):
    """Build containers using docker-compose."""
    common.success('Building docker-compose')
    context.run('docker-compose build')
