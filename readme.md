# Course Selling Application - Backend

## Description

This repository contains a backend for course selling application built with Express.js and MongoDB and written in typescript .
[FrontEnd](https://github.com/Mudit-Jxin7/course_frontend)

## Prerequisites

Before you start using this application, ensure you have the following installed on your system:

- Node.js (v14 or higher)
- Docker
- npm (Node Package Manager)
- MongoDB
- Typescript
- Redis

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Mudit-Jxin7/course_backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd course_backend
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

   ```bash
   docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
   ```

4. Create a `.env` file based on the provided `.env.example`. You can do this by copying the `.env.example` and renaming it to `.env`. Update the values to match your configuration.

   ```plaintext
   SECRET = "YOUR_SECRET_KEY"
   MONGO_URL = "mongodb://localhost:27017/biodrop"
   PASSWORD = "YOUR_PASSWORD"
   PORT = 4000
   STRIPE_SECRET_KEY = "YOUR_SECRET_KEY"
   ```

## Running the Application

To run the application, execute the following command:

```bash
tsc
```

```bash
nodemon dist/index.js
```

The application will start, and you can access it at `http://localhost:4000` (or the port you specified in your `.env` file).
The Redis server will be listening on `http://localhost:8001/redis-stack/browser`

## API Endpoints

The application provides various API endpoints for interacting with the data stored in the MongoDB database. You can find the routes and their descriptions in the source code. Additionally, you can review the OpenAPI Specification for detailed API documentation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- [Mudit Jain](https://github.com/Mudit-Jxin7)
