from invoke import Collection

from provision import django, docker, linters, project, api

ns = Collection(
    django,
    docker,
    project,
    linters,
    api,
)

# Configurations for run command
ns.configure(
    dict(
        run=dict(
            pty=True,
            echo=True,
        ),
    ),
)
