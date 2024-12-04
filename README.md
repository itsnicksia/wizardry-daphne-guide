# Wizardry Variants Daphne Community Guide

This guide is maintained by the community of the [Wizardry Variants Daphne Discord Server](https://discord.gg/YjYmUCkBXK) and is a collaborative, ongoing work in progress.

We welcome contributions and corrections by the community\!

## How to Contribute

1. [Fork the repository on Github](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
1. [Make your changes in Markdown format](https://www.markdownguide.org/basic-syntax/)
1. [Push your changes to your Github fork](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository)
1. [Create your pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

Wait for a maintainer to review and apply your changes - that's it!

### Requirements
 - [Git](https://git-scm.com/)
   - If you haven't used Git before, you might find the [Github Desktop](https://github.com/apps/desktop) client easier to use.
 - [MkDocs](https://www.mkdocs.org/user-guide/installation/) OR [Docker](https://docs.docker.com/engine/)
   - If you haven't used Docker before, you'll probably find it easier to install MkDocs directly on your machine.
   - If installing locally, make sure to also install `mkdocs-glightbox` and `mkdocs-material`

### How to host locally

Make sure you have installed MkDocs or have Docker installed locally.

**Windows/MacOS/Linux (Local)**
```
mkdocs serve
```

**Windows (Docker)**
```
docker run --rm -it -p 8000:8000 -v "%cd%":/docs squidfunk/mkdocs-material
```

**MacOS/Linux (Docker)**
```
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

### Local install (POSIX)

Create and activate a Python [virtual environment](https://docs.python.org/3/library/venv.html):
```
python -m venv .venv/
source .venv/bin/activate
```

Install MkDocs and project dependencies:
```
pip install mkdocs-material mkdocs-glightbox
```
