@echo off
echo.
echo 🏠 Atlanta Gutter Guard Pros - Local Development Server
echo =====================================================
echo.
echo Starting local server...
echo.

cd "%~dp0"
python -m http.server 3000

echo.
echo Server stopped.
pause