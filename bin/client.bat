@ECHO OFF

:: 脚本目录
set "SCRIPT_DIR=%~dp0"

:: 当前目录
set "CURDIR=%SCRIPT_DIR:~0,-1%"

:: 根目录
set "ROOT_DIR=%CURDIR%\..\"

:: 进入根目录
cd %ROOT_DIR%

:: RUN
node .\bin\babel-client