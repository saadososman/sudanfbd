@echo off
cd /d "%~dp0"
npm.cmd --prefix frontend run dev > frontend\dev-server.log 2>&1
echo Dev server exited with code %ERRORLEVEL% >> frontend\dev-server.log
