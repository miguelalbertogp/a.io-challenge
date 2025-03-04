# i.io-challenge

This project consists of a **backend** built with Node.js/Express and a **frontend** built with Angular. The backend generates a 10x10 grid of random alphabetic characters and a 2-digit code based on a specific algorithm. The frontend displays the grid and code, which are updated every 2 seconds.

---
 
## Prerequisites

Before running the project, ensure you have the following installed:

-  **Node.js** (v22 or higher)

-  **npm** (Node Package Manager)

-  **Docker** (optional, for containerized setup)

-  **Docker Compose** (optional, for containerized setup)
 
---

## Getting Started

1. Clone the repository:

    git clone https://github.com/your-username/i.io-challenge.git
    cd i.io-challenge

2. Install dependencies for both the backend and frontend:
    cd backend
    npm install
    cd ../frontend
    npm install
 
 ## Running the Project
 ### Backend
1. Navigate to the  `backend`  directory: `cd backend`
2. Start the backend server: `npm start`
 ### Frontend
1. Navigate to the `frontend` directory: `cd frontend`
2. Start the frontend development server: `npm start`
    
    The frontend will run on `http://localhost:4200`.

 ## ## Docker Setup
 If you prefer to run the project using Docker, follow these steps:

1.  Ensure Docker and Docker Compose are installed.
    
2.  Build and run the containers:`docker-compose up --build`
3.  Access the frontend at  `http://localhost`.
    
4.  Access the backend at  `http://localhost:3000`.