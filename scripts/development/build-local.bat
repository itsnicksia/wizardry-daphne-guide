@echo off
setlocal

:: Get script directory and navigate up two levels
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%..\.." || exit /b 1

echo Building Docker image...
docker build -t wizardry-guide .

if %errorlevel% neq 0 (
    echo Build failed!
    exit /b %errorlevel%
)