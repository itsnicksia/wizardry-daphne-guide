@echo off
setlocal

:: Get script directory and navigate up two levels
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%..\.." || exit /b 1

echo Starting container with hot reload...
echo Press Ctrl+C to stop

docker run -p 8000:8000 -v "%cd%:/docs:delegated" wizardry-guide