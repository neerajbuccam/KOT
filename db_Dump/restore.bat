@echo off

set restoreDate=2017-02-16

echo Restoring Database for %restoreDate% ...

pause

mongorestore --host localhost --port 27017 --drop ./%restoreDate%/

pause