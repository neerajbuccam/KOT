@echo off

start cmd /k npm start

start cmd /k mongod

timeout 5

start http://localhost:3000