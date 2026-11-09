@echo off
setlocal DisableDelayedExpansion
set "ELECTRON_RUN_AS_NODE=1"
"%~dp0..\..\..\..\JueTech Harness.exe" --expose-internals "%~dp0..\..\..\app.asar\quyet\node_modules\@quyet\desktop-host\lib\cli.js" %*
exit /b %errorlevel%
