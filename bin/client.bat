@ECHO OFF

:: �ű�Ŀ¼
set "SCRIPT_DIR=%~dp0"

:: ��ǰĿ¼
set "CURDIR=%SCRIPT_DIR:~0,-1%"

:: ��Ŀ¼
set "ROOT_DIR=%CURDIR%\..\"

:: �����Ŀ¼
cd %ROOT_DIR%

:: RUN
node .\bin\babel-client