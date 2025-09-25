# 🏡 Domus Booking Application

A full-stack booking management system designed specifically for **Boutique Hotels**. Domus provides a modern, responsive interface for guests to browse and book available rooms, and a powerful dashboard for administrators to manage room inventory and view bookings.

---

## ✨ Features

- **User Authentication**: Secure sign-up and sign-in via JWT (JSON Web Token).
- **Room Browsing**: Guests can view all available rooms and filter by date range.
- **Booking Management**: Users can create new bookings, and administrators can view all reservations.
- **Admin Management**: Basic administrative features for property management (e.g., viewing the booking calendar).
- **Responsive UI**: Built with React and React Bootstrap for a clean experience on any device.
- **Future Feature**: Integration of a payment processing system with Stripe.

---

## 🛠️ Tech Stack

### Backend (API)

| Technology          | Description                                        |
| :------------------ | :------------------------------------------------- |
| **Java**            | Core programming language.                         |
| **Spring Boot**     | Framework for rapid application development.       |
| **Maven**           | Dependency management and build tool.              |
| **Spring Data JPA** | For database interaction and room/booking queries. |
| **PostgreSQL**      | Production-ready relational database.              |
| **Security**        | JWT-based authentication.                          |

### Frontend (Client)

| Technology          | Description                                              |     |
| :------------------ | :------------------------------------------------------- | :-- |
| **React**           | Core JavaScript library for building the user interface. |
| **React Bootstrap** | UI components for a professional, responsive design.     |
| **Sass**            | CSS pre-processor for advanced styling.                  |
| **React Router**    | Client-side routing for seamless navigation.             |

---

## ⚙️ Setup and Installation

Follow these steps to get your development environment running locally.

### 1. Prerequisites

You must have the following software installed:

- **Java Development Kit (JDK) 17+**
- **Node.js (LTS)** and **npm** or **yarn**
- **PostgreSQL** Database Server
- **Git**

### 2. Database Configuration

1.  **Create a Database**: Open your PostgreSQL client and create a new database.
    ```sql
    CREATE DATABASE domus_db;
    ```
2.  **Configure `application.properties` (or `application.yml`)**:
    Navigate to your Spring Boot project's `src/main/resources` folder and ensure your configuration file contains the correct database credentials.

    ```properties
    # application.properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/domus_db
    spring.datasource.username=your_postgres_user
    spring.datasource.password=your_postgres_password
    spring.jpa.hibernate.ddl-auto=update # Use 'create' or 'create-drop' for fresh setup
    spring.jpa.show-sql=true
    ```

### 3. Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd domus/backend
    ```
2.  **Build the project:**
    ```bash
    mvn clean install
    ```
3.  **Run the application:**
    Use your IDE (IntelliJ IDEA) to run the `main` application class, or use the Maven command:
    ```bash
    mvn spring-boot:run
    # The API will start on http://localhost:3001 (or your configured port)
    ```

### 4. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure API URL:**
    Ensure your React application's environment file (e.g., `.env` or configuration file) points to the correct backend port (e.g., `http://localhost:3001`).

4.  **Run the application:**
    ```bash
    npm start
    # or
    npm run dev
    # The client will typically open at http://localhost:5173
    ```

---

## 📡 API Endpoints

The API is served from the backend (default: `http://localhost:3001`).

| Endpoint           | Method | Description                                       | Authentication          |
| :----------------- | :----- | :------------------------------------------------ | :---------------------- |
| `/auth/login`      | `POST` | Authenticate a user and return a JWT.             | None                    |
| `/auth/register`   | `POST` | Create a new user account.                        | None                    |
| `/rooms`           | `GET`  | Get a list of all rooms.                          | Required(User or Admin) |
| `/rooms/available` | `GET`  | **Filter rooms by check-in and check-out dates.** | Required(User)          |
| `/booking`         | `POST` | Create a new booking.                             | Required (User)         |
| `/booking`         | `GET`  | Retrieve all bookings (Admin View).               | Required (Admin)        |
| `/admin/rooms`     | `POST` | Create or update a room (Admin Management).       | Required (Admin)        |

---

## 👤 Development & Contribution

If you would like to contribute to the Domus application, please follow standard contribution guidelines:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
