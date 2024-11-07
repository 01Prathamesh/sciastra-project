# SciAstra Project

SciAstra is a full-stack web application that provides APIs for managing courses, blogs, and transactions. The backend is built using Node.js, Express, and MySQL for database management.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
  - [Clone the Repository](#clone-the-repository)
  - [Setting Up the Virtual Environment](#setting-up-the-virtual-environment)
  - [Installing Dependencies](#installing-dependencies)
  - [Configuring Environment Variables](#configuring-environment-variables)
  - [Running the Application](#running-the-application)
- [API Routes](#api-routes)
  - [Courses API](#courses-api)
  - [Blogs API](#blogs-api)
  - [Transactions API](#transactions-api)
- [Testing the API](#testing-the-api)
- [Database Setup](#database-setup)
  - [MySQL Setup](#mysql-setup)
  - [Creating the User](#creating-the-user)
- [Error Handling](#error-handling)
- [License](#license)

## Project Overview

This project is a backend service built with Node.js and Express that interacts with a MySQL database. It exposes several API routes for managing data related to courses, blogs, and transactions. The project follows RESTful principles and implements basic error handling.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building server-side applications.
- **Express**: Web framework for Node.js used to build the API.
- **MySQL**: Relational database management system for storing the data.
- **dotenv**: Module for managing environment variables.
- **mysql2**: MySQL client for Node.js that allows interaction with the database.
- **body-parser**: Middleware for parsing incoming request bodies in a middleware before your handlers.

## Installation Instructions

### Clone the Repository

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/01Prathamesh/sciastra-project.git
    cd sciastra-project
    ```

### Setting Up the Virtual Environment

2. **Set up the virtual environment** (if you're using Python dependencies alongside Node.js):
    - You can create a virtual environment using Python's `venv`:

    ```bash
    python -m venv .venv
    ```

3. **Activate the virtual environment**:
    - For **Windows**:
    ```bash
    .\.venv\Scripts\activate
    ```
    - For **macOS/Linux**:
    ```bash
    source .venv/bin/activate
    ```

### Installing Dependencies

4. **Install Node.js dependencies** using npm:
    ```bash
    npm install
    ```

### Configuring Environment Variables

5. **Create a `.env` file** in the root directory of the project to store your environment variables. This file should contain:

    ```dotenv
    DB_HOST=localhost
    DB_USER=sciastra_user
    DB_PASSWORD=your_password_here
    DB_NAME=sciastra_db
    PORT=5000
    ```

    Replace `your_password_here` with the actual password for the `sciastra_user` MySQL user.

### Running the Application

6. **Run the application**:
    ```bash
    node backend/server.js
    ```

7. The server will start on port 5000 (or the port defined in the `.env` file). You should see the message:
    ```bash
    Server running on http://localhost:5000
    Connected to the MySQL database
    ```

## API Routes

The backend exposes the following API routes:

### Courses API

- **GET** `/api/courses`  
  - Description: Fetch a list of all courses.
  - Response: Returns a list of courses from the database.
  
- **POST** `/api/courses`  
  - Description: Add a new course to the database.
  - Body:  
    ```json
    {
      "course_name": "Course Name",
      "description": "Course Description"
    }
    ```
  - Response: Returns the added course data.

### Blogs API

- **GET** `/api/blogs`  
  - Description: Fetch a list of all blogs.
  - Response: Returns a list of blogs from the database.

- **POST** `/api/blogs`  
  - Description: Add a new blog.
  - Body:  
    ```json
    {
      "title": "Blog Title",
      "content": "Blog Content"
    }
    ```
  - Response: Returns the added blog data.

### Transactions API

- **GET** `/api/transactions`  
  - Description: Fetch a list of all transactions.
  - Response: Returns a list of transactions from the database.

- **POST** `/api/transactions`  
  - Description: Add a new transaction.
  - Body:  
    ```json
    {
      "user_id": 1,
      "amount": 100.00,
      "transaction_date": "2023-11-07"
    }
    ```
  - Response: Returns the added transaction data.

## Testing the API

Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints.

1. **GET** requests should return a list of data.
2. **POST** requests should add new data and return the added item.

### Example Test with Postman:
- **GET** `/api/courses`: Should return a JSON array of courses.
- **POST** `/api/courses`: Should accept a JSON body to create a new course.

## Database Setup

### MySQL Setup

1. Install MySQL if it's not already installed: [MySQL Download](https://dev.mysql.com/downloads/installer/).
2. Create a new MySQL database for the project (e.g., `sciastra_db`).

### Creating the User

3. Create a new user (`sciastra_user`) and grant necessary permissions:
    ```sql
    CREATE USER 'sciastra_user'@'localhost' IDENTIFIED BY 'your_password_here';
    GRANT ALL PRIVILEGES ON sciastra_db.* TO 'sciastra_user'@'localhost';
    FLUSH PRIVILEGES;
    ```

4. Use the credentials in the `.env` file to configure the connection.

## Error Handling

The application includes basic error handling middleware that will catch errors in the application and return a generic error message.

    ```js
    app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
    });


## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.