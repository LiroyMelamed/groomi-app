# Groomi App

Welcome to Groomi App! This project is a full-stack web application for managing a grooming queue. It consists of:
- **Frontend**: React.js
- **Backend**: .NET Core (C#) with SQL Server

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

## Prerequisites
- Node.js (Latest LTS Version)
- npm (Node Package Manager)
- .NET 6 or higher
- SQL Server (LocalDB or a remote instance)

---
## Installation
### Clone the Repository
```sh
git clone https://github.com/LiroyMelamed/groomi-app.git
cd groomi-app
```

---
## Frontend Setup

### Navigate to Frontend Directory
```sh
cd frontend
```

### Install Dependencies
```sh
npm install
```

### Start the Development Server
```sh
npm start
```
- The React app will be available at: `http://localhost:3000`

### Environment Variables (Optional)
Create a `.env` file to configure API base URL:
```env
REACT_APP_API_URL=http://localhost:5088/api
```

---
## API Endpoints
### Authentication
- `POST /api/Auth/register` → Register a new user
- `POST /api/Auth/login` → Authenticate and retrieve a token

### Grooming Queue
- `GET /api/GroomingQueue` → Fetch all appointments
- `POST /api/GroomingQueue` → Add a new appointment
- `PUT /api/GroomingQueue/{id}` → Update an appointment
- `DELETE /api/GroomingQueue/{id}` → Delete an appointment

---
## Usage
1. **Login/Register** in the app.
2. **Add an Appointment** with a customer name and appointment time.
3. **View, Edit, or Delete** appointments via the dashboard.
4. **Filter appointments** based on time or customer name.

---
## Contributions
Feel free to fork and contribute to this project!


