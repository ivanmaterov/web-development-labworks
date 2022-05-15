from invoke import Collection

from provision import django, docker, linters, project

ns = Collection(
    django,
    docker,
    project,
    linters,
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
