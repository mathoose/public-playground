@echo off
setlocal
cd /d "%~dp0"

if not exist "index.html" (
  echo This file has to stay inside the bubble-frame folder.
  pause
  exit /b 1
)

where python >nul 2>nul
if %ERRORLEVEL%==0 (
  set PY=python
) else (
  where python3 >nul 2>nul
  if %ERRORLEVEL%==0 (
    set PY=python3
  ) else (
    echo Python is missing. Install it from https://www.python.org/downloads/
    pause
    exit /b 1
  )
)

set PORT=8080
echo.
echo   Bubble Frame is running.
echo   Leave this window open.
echo.
echo   http://127.0.0.1:%PORT%/
echo.
echo   Close this window when you are done.
echo.

start "" "http://127.0.0.1:%PORT%/"
%PY% -m http.server %PORT% --bind 127.0.0.1
pause
