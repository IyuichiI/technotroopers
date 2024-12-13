# Water Management App - Setup and Run Instructions

This guide provides step-by-step instructions for setting up and running the Water Management App on any device. The app consists of a **backend** and a **frontend**, with a PostgreSQL database to manage data.

---

## **Prerequisites**

Ensure you have the following installed on your device:

1. **Node.js** (LTS version recommended)
   - Download from [Node.js official site](https://nodejs.org/).
2. **PostgreSQL** (Database setup)
   - Download from [PostgreSQL official site](https://www.postgresql.org/).
3. **Nodemon** (Backend auto-restart tool)
   - Install globally using:
     ```bash
     npm install -g nodemon
     ```
4. **Git** (Optional, for cloning the repository)
   - Download from [Git official site](https://git-scm.com/).

---

## **Database Setup**

1. **Create a PostgreSQL Database**
   - Open your PostgreSQL client (e.g., `psql`) and run:
     ```sql
     CREATE DATABASE water_management;
     ```

2. **Create the Tables**
   - Open the SQL shell or any PostgreSQL client, connect to the `water_management` database, and run:
     ```sql
     CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
     );

     CREATE TABLE consumption (
         id SERIAL PRIMARY KEY,
         user_id INT REFERENCES users(id),
         consumption_value INT NOT NULL,
         consumption_date DATE NOT NULL,
         water_usage INT NOT NULL,
         bill_amount NUMERIC(10, 2) NOT NULL
     );
     ```

3. **Insert Sample Data**
   - Insert data for testing. For example:
     ```sql
     INSERT INTO users (name, email, password) VALUES ('John Doe', 'john.doe@example.com', 'password123');

     INSERT INTO consumption (user_id, consumption_value, consumption_date, water_usage, bill_amount)
     VALUES
         (1, 150, '2024-01-15', 50, 20.00),
         (1, 200, '2024-02-15', 60, 25.00);
     ```

---

## **Backend Setup**

1. **Navigate to the Backend Directory**
   ```bash
   cd water-management-app-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Create a `.env` file in the `water-management-app-backend` directory and add:
     ```env
     DB_USER=your_postgresql_username
     DB_PASSWORD=your_postgresql_password
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=water_management
     ```

4. **Start the Backend**
   ```bash
   nodemon index.js
   ```
   - The backend will run on `http://localhost:5000`.

---

## **Frontend Setup**

1. **Navigate to the Frontend Directory**
   ```bash
   cd water-management-app-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Frontend**
   ```bash
   npm run dev
   ```
   - The frontend will run on a Vite server (e.g., `http://localhost:5173`).

4. **Update the Authentication Utility**
   - Ensure the `utils/auth.js` file uses `jwt-decode` correctly. Install it if needed:
     ```bash
     npm install jwt-decode
     ```

---

## **Access the Application**

1. **Frontend:** Open `http://localhost:5173` in your browser.
2. **Backend:** Ensure `http://localhost:5000` is running.

---

## **Common Errors and Fixes**

1. **CORS Issues:**
   - If you encounter CORS errors, ensure the `cors` middleware is configured in `index.js`.
     ```javascript
     app.use(cors());
     ```

2. **Database Connection Errors:**
   - Verify the `.env` file values match your PostgreSQL setup.

3. **Port Conflicts:**
   - If ports are already in use, change them in `index.js` (backend) or `vite.config.js` (frontend).

---

## **Directory Structure**

- `water-management-app-backend`
  - Backend code (Express server)
- `water-management-app-frontend`
  - Frontend code (React + Vite)

---

You're all set to run the Water Management App on your device.
