@echo off
call build.bat
echo stopping previowsly running container...
docker stop bureaucrat > nul
echo removing container...
docker rm bureaucrat > nul
run.bat > nul