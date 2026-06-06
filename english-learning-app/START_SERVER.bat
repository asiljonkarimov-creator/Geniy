@echo off
echo ====================================
echo   Ingliz Tili O'rganish Dasturi
echo   Server ishga tushirilmoqda...
echo ====================================
echo.

cd /d "%~dp0"

echo Brauzerni ochish uchun kutib turing...
timeout /t 2 /nobreak >nul

start http://localhost:8000

echo Server ishga tushdi!
echo Brauzerni oching: http://localhost:8000
echo.
echo Server to'xtatish uchun: Ctrl+C bosing
echo.

python -m http.server 8000
