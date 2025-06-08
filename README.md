![image](https://github.com/user-attachments/assets/ac859ee4-bbfc-47e8-9ae9-d641c50c06e2)

# Task Manager App

A simple full-stack task management application built with React (frontend) and Express (backend).  
Users can add, view, update status, and delete tasks. Now with basic offline support via localStorage caching .
## Features
- Add, update, delete, and view tasks  
- Task status tracking (To Do, In Progress, Done)  
- REST API backend with Express  
- React frontend powered by Vite
- LocalStorage caching (offline fallback)
- Dockerized for easy deployment and development
## Tech Stack

| Part     | Technology          |
| -------- | ------------------- |
| Frontend | React, Vite         |
| Backend  | Node.js, Express    |
| Containerization | Docker, Docker Compose |
| Caching      | Browser LocalStorage   |

## Prerequisites
- [Node.js and npm](https://nodejs.org/en/download/) (if running without Docker)  
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (recommended for containerized setup)
## Local Development Setup

### Running with Docker (Recommended)

1. Install Docker Desktop and ensure Docker daemon is running.

2. From the project root directory (where `docker-compose.yml` is located), run:
   docker-compose up --build
Access the application in your browser:
Frontend: http://localhost:5173
Backend API: http://localhost:5000

To stop the application, press Ctrl + C in the terminal and run:  docker-compose down
Running Locally without Docker
## Backend:
Navigate to the backend folder:cd backend
Install dependencies:->npm install  -> Start the backend server:-> node index.js
## Frontend
Navigate to the frontend folder: cd frontend -> Install dependencies: -> npm install -> Start the frontend development server:-> npm run dev
Open your browser at http://localhost:5173.
## Usage
1. Fill in the task form to add new tasks.
2.Click Complete to update status or Delete to remove tasks.
3. Click Refresh Tasks from Server to sync with backend.
4. Tasks are also cached in browser localStorage for better performance and offline support.

