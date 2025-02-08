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
## Backend Setup

### Navigate to Backend Directory
```sh
cd backend/GroomiBackend
```

### Configure the Database
1. Open **`appsettings.json`** and set your database connection string under `ConnectionStrings`:
    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Server=localhost;Database=GroomiDB;Trusted_Connection=True;"
    }
    ```
2. Run the following commands to apply migrations and seed the database:
    ```sh
    dotnet ef database update
    ```
3. (Optional) If needed, create the database manually in SQL Server and execute stored procedures:
    ```sql
    CREATE PROCEDURE GetGroomingQueue
    AS
    BEGIN
        SELECT * FROM GroomingQueue ORDER BY AppointmentTime ASC;
    END;
    ```

### Run the Backend Server
```sh
dotnet run
```
- The API will be available at: `http://localhost:5088/api`

---

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


