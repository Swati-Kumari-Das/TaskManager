# Task Manager App

A simple full-stack task management application built with React (frontend) and Express (backend).  
Users can add, view, update status, and delete tasks.
## Features
- Add, update, delete, and view tasks  
- Task status tracking (To Do, In Progress, Done)  
- REST API backend with Express  
- React frontend powered by Vite  
- Dockerized for easy deployment and development
## Tech Stack

| Part     | Technology          |
| -------- | ------------------- |
| Frontend | React, Vite         |
| Backend  | Node.js, Express    |
| Containerization | Docker, Docker Compose |
## Prerequisites
- [Node.js and npm](https://nodejs.org/en/download/) (if running without Docker)  
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (recommended for containerized setup)
## Local Development Setup

### Running with Docker (Recommended)

1. Install Docker Desktop and ensure Docker daemon is running.

2. From the project root directory (where `docker-compose.yml` is located), run:

   ```bash
   docker-compose up --build
Access the application in your browser:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

To stop the application, press Ctrl + C in the terminal and run:

bash
Copy
Edit
docker-compose down
Running Locally without Docker
Backend
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Start the backend server:

bash
Copy
Edit
node index.js
Frontend
Navigate to the frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend development server:

bash
Copy
Edit
npm run dev
Open your browser at http://localhost:5173.

Usage
Add new tasks using the form on the frontend.

Tasks can be marked complete or deleted.

The frontend communicates with the backend API to store and update tasks.

Tasks are stored in-memory on the backend (data resets on server restart).

Project Structure
bash
Copy
Edit
/backend
  ├─ index.js        # Express backend server
  └─ package.json
/frontend
  ├─ src
  │   └─ TodoList.jsx  # Main React component
  └─ package.json
/docker-compose.yml
Notes
The backend uses an in-memory array to store tasks; for production, integrate a database like MongoDB.

Docker Compose helps run frontend and backend simultaneously in containers.

Ports used: frontend (5173), backend (5000).
