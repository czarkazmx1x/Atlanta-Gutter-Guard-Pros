@echo off
echo ==========================================
echo Atlanta Gutter Guard Pros - SEO Checker
echo ==========================================
echo.

echo Choose an option:
echo 1. Run full SEO readiness check
echo 2. Check sitemap only
echo 3. Check priority pages only
echo 4. Generate HTML report only
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Running full SEO check...
    powershell.exe -ExecutionPolicy Bypass -File "seo-checker.ps1"
) else if "%choice%"=="2" (
    echo Checking sitemap...
    powershell.exe -ExecutionPolicy Bypass -File "seo-checker.ps1" -CheckSitemap
) else if "%choice%"=="3" (
    echo Testing priority pages...
    powershell.exe -ExecutionPolicy Bypass -File "seo-checker.ps1" -TestPages
) else if "%choice%"=="4" (
    echo Generating HTML report...
    powershell.exe -ExecutionPolicy Bypass -File "seo-checker.ps1" -GenerateReport
) else (
    echo Invalid choice. Running full check...
    powershell.exe -ExecutionPolicy Bypass -File "seo-checker.ps1"
)

echo.
echo Script completed! Check the generated files.
pause
