# Guide Toolchain Setup

--8<-- "./contributing/setup-common.md"

## Installation

### Git

!!! note inline end
    The official distribution of git is purely a command-line interface. It is
    recommended to start with it, but if you find it unpleasant to use, there
    are many [GUI clients
    available](https://git-scm.com/downloads/guis?os=windows). GitHub also has
    their own [desktop client](https://github.com/apps/desktop).

Download and run git installer: <https://git-scm.com/downloads/win>

The default options are mostly fine, but do read the descriptions before
proceeding. Git comes with its own bundled Bash shell, but in this guide we use
Windows native PowerShell.

### Python

Download and run Python installer: <https://www.python.org/downloads/>

During install, enable option `Add Python [ver] to PATH` to use Python from
PowerShell.

### MkDocs

Start up PowerShell and clone your forked Guide git repository:

``` ps1
PS C:\Users\anon> git clone https://github.com/anon/wizardry-daphne-guide
PS C:\Users\anon> cd wizardry-daphne-guide
```

Create a Python [virtual
environment](https://docs.python.org/3/library/venv.html), where MkDocs and all
dependencies are installed. This isolates the installation from the system-wide
Python files and is highly recommended (but not mandatory).

``` ps1
PS C:\Users\anon\wizardry-daphne-guide> python -m venv .venv
```

Activate virtual environment:

``` ps1
PS C:\Users\anon\wizardry-daphne-guide> .\.venv\Scripts\Activate.ps1
```

!!! note "What to do if activation fails"
    In case Windows policy has disabled script execution, use this commands to
    enable it:
    ``` ps1
    PS C:\> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

Finally, install MkDocs and dependencies using `pip` (Package Installer for
Python). List of packages to install comes from `requirements.txt`, hosted in
the git repository:

``` ps1
(.venv) PS C:\Users\anon\wizardry-daphne-guide> pip install -r requirements.txt
```

Start up your local site:

``` ps1
(.venv) PS C:\Users\anon\wizardry-daphne-guide> mkdocs serve
```

You can now browse the site at `http://127.0.0.1:8000`.

## Usage

Always re-activate Python virtual environment before starting the site.

``` ps1
PS C:\Users\anon> cd wizardry-daphne-guide
PS C:\Users\anon\wizardry-daphne-guide> .\.venv\Scripts\Activate.ps1
(.venv) PS C:\Users\anon\wizardry-daphne-guide> mkdocs serve
```

Changes to the site sources are automatically detected and deployed, so you can
leave it running for as long as you need it.
