@echo off
echo =====================================
echo  Website Performance Optimization
echo  Atlanta Gutter Guard Pros
echo =====================================
echo.

echo Current image sizes:
echo.

for %%f in (images\hero\*.jpg) do (
    echo Hero: %%f - Size: 
    dir "%%f" | findstr /C:"%%~nxf"
)

echo.
for %%f in (images\gallery\*.jpg) do (
    echo Gallery: %%f - Size:
    dir "%%f" | findstr /C:"%%~nxf"
)

echo.
echo =====================================
echo  OPTIMIZATION NEEDED
echo =====================================
echo.
echo 1. Your hero image is 2.2MB - needs to be under 100KB
echo 2. Gallery images are 1.7MB each - need to be under 50KB each
echo 3. Total potential savings: 11,253 KiB (11.2MB)
echo.
echo RECOMMENDED TOOLS:
echo - Online: tinypng.com, squoosh.app
echo - Desktop: Photoshop, GIMP
echo.
echo TARGET DIMENSIONS:
echo - Hero: 600x400px
echo - Gallery: 300x200px
echo.
echo CREATE THESE FILES:
echo images/hero/main-hero-optimized.webp
echo images/hero/main-hero-optimized.jpg
echo images/gallery/before-1-optimized.webp
echo images/gallery/before-1-optimized.jpg
echo images/gallery/after-1-optimized.webp
echo images/gallery/after-1-optimized.jpg
echo images/gallery/before-2-optimized.webp
echo images/gallery/before-2-optimized.jpg
echo images/gallery/after-2-optimized.webp
echo images/gallery/after-2-optimized.jpg
echo.
echo =====================================
echo  DEPLOYMENT READY FILES
echo =====================================
echo.
echo Optimized files created:
echo ✅ index-optimized.html
echo ✅ styles-non-critical.css  
echo ✅ script-optimized.js
echo ✅ flexible-images-optimized.js
echo.
echo After optimizing images, deploy with:
echo wrangler pages deploy . --project-name atlanta-gutter-guard-pros
echo.
pause
