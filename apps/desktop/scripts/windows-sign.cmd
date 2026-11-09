@echo off
setlocal DisableDelayedExpansion
set "signTool=%QUYET_DESKTOP_WINDOWS_SIGNTOOL%"
set "certificateFile=%QUYET_DESKTOP_WINDOWS_CER_FILE%"
set "tokenPin=%QUYET_DESKTOP_WINDOWS_TOKEN_PIN%"
set "keyContainer=%QUYET_DESKTOP_WINDOWS_KEY_CONTAINER%"
set "targetFile=%QUYET_DESKTOP_WINDOWS_SIGN_TARGET%"
set "appendSignature="
if "%QUYET_DESKTOP_WINDOWS_SIGN_APPEND%"=="1" set "appendSignature=/as"
set "QUYET_DESKTOP_WINDOWS_SIGNTOOL="
set "QUYET_DESKTOP_WINDOWS_CER_FILE="
set "QUYET_DESKTOP_WINDOWS_TOKEN_PIN="
set "QUYET_DESKTOP_WINDOWS_KEY_CONTAINER="
set "QUYET_DESKTOP_WINDOWS_SIGN_TARGET="
set "QUYET_DESKTOP_WINDOWS_SIGN_APPEND="
set "signTool=" & set "certificateFile=" & set "tokenPin=" & set "keyContainer=" & set "targetFile=" & set "appendSignature=" & "%signTool%" sign /v /fd sha256 /f "%certificateFile%" /kc "[{{%tokenPin%}}]=%keyContainer%" /csp "eToken Base Cryptographic Provider" %appendSignature% "%targetFile%"
exit /b %errorlevel%
