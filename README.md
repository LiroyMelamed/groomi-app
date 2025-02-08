# 🐾 Groomi App

**Groomi** is a web-based application designed to manage grooming appointments efficiently. It provides an intuitive interface for customers and admins to schedule, update, and track appointments.

---

## 📁 Project Structure

This project is divided into two main parts:

1. **Backend** - ASP.NET Core Web API that manages authentication, appointments, and users.
2. **Frontend** - ReactJS web application that provides the UI for managing appointments.

Each section contains its own README file with detailed instructions.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/LiroyMelamed/groomi-app.git
cd groomi-app
```

### 2️⃣ Setup Backend
Navigate to the `backend/` folder and follow the instructions in `backend/README.md`.

```sh
cd backend
```

### 3️⃣ Setup Frontend
Navigate to the `frontend/` folder and follow the instructions in `frontend/README.md`.

```sh
cd frontend
```

---

## ⚙️ Backend Setup (ASP.NET Core API)

### 📌 Prerequisites
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### 🔧 Installation

1. **Navigate to Backend Directory**
```sh
cd backend/GroomiBackend
```

2. **Set Up Database**
- Update `appsettings.json` with your SQL Server connection string.
- Apply Migrations and Update Database:
```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```

3. **Run the API**
```sh
dotnet run
```
API will be available at `http://localhost:5088/api`.

### 🔑 Authentication
- The app uses **JWT-based authentication**.
- Users must log in to obtain a token for API requests.

**API Endpoints:**
- `POST /api/Auth/register` - Register a new user
- `POST /api/Auth/login` - Authenticate and get a JWT token
- `GET /api/GroomingQueue` - Fetch all appointments (Requires authentication)

---

## 🎨 Frontend Setup (ReactJS)

### 📌 Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 🔧 Installation

1. **Navigate to Frontend Directory**
```sh
cd frontend
```

2. **Install Dependencies**
```sh
npm install
```

3. **Run the Frontend**
```sh
npm start
```

The React app will start at `http://localhost:3000/`.

### 🔗 API Connection
- The frontend interacts with the backend API via `api/ApiUtils.js`.
- Ensure the API base URL matches your backend setup.

---

## 🚀 Using Groomi App

1. **Login/Register**
   - Open `http://localhost:3000/`
   - Register a new user or log in with existing credentials.

2. **Manage Appointments**
   - Add, update, or delete grooming appointments.

3. **Admin Features**
   - Admin users can modify all appointments.

---

## 📜 License
This project is licensed under the MIT License.

---

## 🤝 Contributions
- Feel free to submit pull requests or report issues on [GitHub](https://github.com/LiroyMelamed/groomi-app).

---

Happy grooming! 🐶

