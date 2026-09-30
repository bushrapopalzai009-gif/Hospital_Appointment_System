@echo off
setlocal
pushd "%~dp0"

echo ===============================================
echo   Carepoint Hospital System - First-time setup
echo ===============================================

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install the current LTS version from https://nodejs.org/ and run setup.bat again.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js with the npm option enabled, then run setup.bat again.
  pause
  exit /b 1
)

echo Installing root tools...
call npm install
if errorlevel 1 goto :failed

echo Installing Express and MongoDB API dependencies...
call npm install --prefix server
if errorlevel 1 goto :failed

echo Installing React app dependencies...
call npm install --prefix client
if errorlevel 1 goto :failed

if not exist "server\.env" (
  echo Creating a local server/.env with a generated development JWT secret...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$secret = [guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N'); $content = Get-Content 'server/.env.example' -Raw; $content = $content.Replace('replace_with_a_long_random_secret', $secret); Set-Content -Path 'server/.env' -Value $content -NoNewline"
  if errorlevel 1 goto :failed
)

echo.
echo Setup finished. Make sure MongoDB is running, then double-click run.bat.
echo To use MongoDB Atlas, update MONGO_URI in server/.env first.
echo Optional sample data: npm run seed --prefix server
echo.
if not defined CAREPOINT_LAUNCH pause
popd
exit /b 0

:failed
echo.
echo Setup could not finish. Check the error above, then run setup.bat again.
pause
popd
exit /b 1
