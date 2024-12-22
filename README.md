# E-Library Backend - README

## Overview

This repository contains the backend implementation of the **E-Library** application. The backend is built using **NestJS**, **GraphQL**, and **TypeORM** with a **Microsoft SQL Server (MSSQL)** database hosted on AWS EC2. The system supports user registration, login, grade and subject management, and a variety of role-based access functionalities for students, parents, and teachers.

## Tech Stack

- **NestJS**: Framework for building efficient, scalable Node.js server-side applications.
- **GraphQL**: A query language for your API, enabling flexible and efficient data fetching.
- **Apollo Server**: A community-driven, open-source GraphQL server that integrates well with NestJS.
- **TypeORM**: ORM for connecting and interacting with the MSSQL database.
- **MSSQL**: The relational database management system used for storing data.
- **AWS EC2**: Hosting platform for running the application.
- **AWS S3**: Used for storing PDF files for the modules.
- **Swagger(Optional)**: For API documentation.

## Features

- **User Registration and Login**:
  - Three types of users: **Students**, **Parents**, and **Teachers**.
  - Email, password authentication, and role-specific data fields.
  - Students can view their scheduled classes and modules based on their grade.
  - Parents can monitor the activities of their children.
  - Teachers can access all grade modules in their subject.

- **Grade and Subject Management**:
  - Teachers can provide access to modules (e.g., Algebra, Trigonometry) by using passcodes.
  - Parents can see the modules their children are enrolled in.

- **Tracking**:
  - Track how much time a student spends on the platform.

## Prerequisites

Before running the project, ensure the following are installed and configured:

- **Node.js**: >= 18.0.0
- **npm**: Package manager for Node.js.
- **AWS EC2** instance with MSSQL database.
- **AWS S3**: For storing PDF files.
- **NestJS CLI**: For running NestJS commands.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/skr2270/elib.git
cd elib
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```env
DATABASE_HOST=<HOST_ADDRESS>
DATABASE_PORT=1433
DATABASE_USERNAME=<USERNAME>
DATABASE_PASSWORD=<PASSWORD>
DATABASE_NAME=<DB_NAME>
AWS_S3_BUCKET_NAME=your-s3-bucket-name
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

### 4. Start the Application

To start the backend, run:

```bash
npm run start
```

This will start the NestJS server on `http://localhost:3000`.

## Database Setup

The backend uses **Microsoft SQL Server** (MSSQL) as the database. Follow these steps to set up the database:

1. **Create the Database**: Make sure the `ElibDB` database exists on the SQL Server instance.
2. **Synchronize Database**: The backend uses TypeORM to synchronize the schema with the database. Ensure the database is connected and the `synchronize: true` flag is enabled in the `TypeORM` configuration.

### Example Connection String

```js
TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
    }),
```

## GraphQL Playground

Once the application is running, you can test the GraphQL API using the **GraphQL Playground**.

- Open your browser and visit: (http://localhost:3000/graphql)
- You can use this query to test if everything is working:

```graphql
query {
  hello
}
```

Response:

```json
{
  "data": {
    "hello": "Hello, GraphQL!"
  }
}
```
### GraphQL Query Patterns
**Create User**: This mutation creates a new user with the provided details:
```
mutation {
  createUser(createUserDto: {
    FirstName: "Sai"
    LastName: "Kumar"
    Email: "saikumar@duck.com"
    Password: "password123"
    UserType: 1
  }) {
    UserId
    FirstName
    LastName
    Email
    UserType
  }
}
```
***Example Response***:
```
{
  "data": {
    "createUser": {
      "UserId": 1,
      "FirstName": "Sai",
      "LastName": "Kumar",
      "Email": "saikumar@duck.com",
      "UserType": 1
    }
  }
}
```

**Get All Users**: This query fetches all the users from the system:
```
query {
  getAllUsers {
    UserId
    FirstName
    LastName
    Email
    UserType
  }
}
```
***Example Response***:
```
{
  "data": {
    "getAllUsers": [
      {
        "UserId": 1,
        "FirstName": "Anil",
        "LastName": "Yana",
        "Email": "a.test@gmail.com",
        "UserType": 1
      },
      {
        "UserId": 2,
        "FirstName": "Sai",
        "LastName": "Kumar",
        "Email": "saikumar@duck.com",
        "UserType": 1
      }
    ]
  }
}
```

**Get a User by ID**: This query fetches details of a user by their UserId:
```
query {
  getUserById(userId: 2) {
    UserId
    FirstName
    LastName
    Email
    UserType
  }
}
```
***Example Response***:
```
{
  "data": {
    "getUserById": {
      "UserId": 2,
      "FirstName": "Sai",
      "LastName": "Kumar",
      "Email": "saikumar@duck.com",
      "UserType": 1
    }
  }
}
```

**Update a User**: This mutation updates the details of a user with the specified UserId:
```
mutation {
  updateUser(userId: 2, updateUserDto: {
    FirstName: "Sai"
    LastName: "Kumar"
    Email: "saikumar@duck.com"
    Password: "newpassword123"
    UserType: 2
  }) {
    UserId
    FirstName
    LastName
    Email
    UserType
  }
}
```
***Example Response***:
```
{
  "data": {
    "updateUser": {
      "UserId": 2,
      "FirstName": "Sai",
      "LastName": "Kumar",
      "Email": "saikumar@duck.com",
      "UserType": 2
    }
  }
}
```

**Delete a User**: This mutation deletes a user with the specified UserId:
```
mutation {
  deleteUser(userId: 2)
}
```
***Example Response***
```
{
  "data": {
    "deleteUser": true
  }
}
```


## API Documentation

Swagger UI is enabled for API documentation. Once the application is running, you can visit the following URL to see the full API documentation:

(http://localhost:3000/api)

## AWS S3 Integration

For storing module PDFs, make sure AWS S3 is configured:

1. Create an S3 bucket in AWS.
2. Store your access keys in the `.env` file.
3. The application will interact with S3 for file uploads and downloads.

## Development

### Run the Application in Development Mode

```bash
npm run start:dev
```

This will run the application with auto-reload on file changes.

### Run Tests

You can run tests using Jest:

```bash
npm run test
```

For end-to-end tests:

```bash
npm run test:e2e
```

### Linting and Formatting

Use ESLint to maintain code quality:

```bash
npm run lint
```

## Troubleshooting

- **Cannot connect to database**: Ensure that the database connection details are correct and that the MSSQL server is accessible from your machine.
- **Elastic IP or Dynamic DNS**: If you're using an EC2 instance with a dynamic IP, consider using an Elastic IP to ensure a static IP address for your server.

## Future Enhancements

- **User Authentication**: Implement JWT-based authentication for more secure login handling.
- **Role-Based Access Control**: Extend the access control logic to include more granular permissions based on user roles.
- **Testing**: Implement more unit and integration tests for the GraphQL resolvers and services.
- **API Rate Limiting**: To prevent abuse, consider adding rate limiting to your API endpoints.

## License

This project is licensed under the MIT License - see the (LICENSE) file for details.
