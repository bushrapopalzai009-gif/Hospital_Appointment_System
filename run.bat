@echo off
setlocal
pushd "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install the current LTS version from https://nodejs.org/ first.
  pause
  popd
  exit /b 1
)

if not exist "node_modules\concurrently" goto :setup
if not exist "server\node_modules\express" goto :setup
if not exist "client\node_modules\vite" goto :setup
if not exist "server\.env" (
  echo Server configuration is missing. Running first-time setup...
  goto :setup
)
goto :launch

:setup
set "CAREPOINT_LAUNCH=1"
call "%~dp0setup.bat"
if errorlevel 1 (
  popd
  exit /b 1
)

:launch
echo Starting the Express API and React app...
start "Carepoint - API and Frontend" /D "%~dp0" cmd /k "npm run dev"
echo Waiting for the development server, then opening the app...
timeout /t 5 /nobreak >nul
start "" "http://localhost:5173"
echo Both services are running in the Carepoint terminal window.
echo Close that window to stop the API and frontend.
popd
exit /b 0
