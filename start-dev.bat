@echo off

start cmd /k "cd frontend && npm start"
start cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload --reload"