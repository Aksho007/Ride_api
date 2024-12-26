# Ride API

## Table of Contents
1. [Description](#description)
2. [Libraries Used](#libraries-used)
3. [Installation](#installation)
4. [API Endpoints](#api-endpoints)

## Description
This is a Ride API that allows users to register, login, view their profile, list rides, and get ride details. It also includes authentication and authorization mechanisms.

## Libraries Used
- express
- mongoose
- bcrypt
- jsonwebtoken
- dotenv
- cookie-parser
- express-validator
- cors

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/ride_api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ride_api
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and add your environment variables:
    ```env
    DB_CONNECT=mongodb://0.0.0.0/ride-api(your_mongodb_connection_string)
    JWT_SECRET=ride-api-secret(your_jwt_secret)
    PORT=4000
    ```
5. Install all libraries:
    ```bash
    npm install express mongoose bcrypt jsonwebtoken dotenv cookie-parser express-validator cors
    ```
6. Run the application using nodemon:
    ```bash
    npx nodemon
    ```

## API Endpoints

### User Registration
- **Endpoint:** `/users/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "user@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "password": "password123"
    }
    ```

### User Login
- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```

### Get User Profile
- **Endpoint:** `/users/profile`
- **Method:** `GET`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```

### User Logout
- **Endpoint:** `/users/logout`
- **Method:** `GET`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```

### List Rides
- **Endpoint:** `/users/listrides`
- **Method:** `GET`

### Get Ride Details
- **Endpoint:** `/users/ridedetails/:rideId`
- **Method:** `GET`

### /users/register

**POST** `/users/register`

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

#### Request Body

The request body should be a JSON object with the following structure:
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Validation

- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

#### Responses

- **201 Created**: Returns a JSON object containing the user data and token.
  ```json
  {
    "token": "string",
    "user": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "socketId": "string"
    }
  }
  ```

- **400 Bad Request**: Returns a JSON object with validation errors or user already exists.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
  - **OR**
  ```json
  {
    "message": "User already exist"
  }
  ```

### /users/login

**POST** `/users/login`

This endpoint is used to log in an existing user. It requires the user's email and password.

#### Request Body

The request body should be a JSON object with the following structure:
```json
{
  "email": "string",
  "password": "string"
}
```

#### Validation

- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

#### Responses

- **200 OK**: Returns a JSON object with a success message.
  ```json
  {
    "message":"You're successfully logged in to Fery Ride app"
  }
  ```

- **400 Bad Request**: Returns a JSON object with validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```

- **401 Unauthorized**: Returns a JSON object with an error message.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### /users/profile

**GET** `/users/profile`

This endpoint is used to retrieve the profile of the authenticated user.

#### Headers

- `Authorization`: Bearer token

#### Responses

- **200 OK**: Returns a JSON object containing the user profile.
  ```json
  {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string"
  }
  ```

- **401 Unauthorized**: Returns a JSON object with an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### /users/logout

**GET** `/users/logout`

This endpoint is used to log out the authenticated user.

#### Headers

- `Authorization`: Bearer token

#### Responses

- **200 OK**: Returns a JSON object with a success message.
  ```json
  {
    "message": "Logged out"
  }
  ```

- **401 Unauthorized**: Returns a JSON object with an error message.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### /users/listrides

**GET** `/users/listrides`

Returns a list of mock rides with ride ID, distance, and fare.

#### Responses

- **200 OK**: Returns a JSON object containing an array of rides.
  ```json
  {
    "rides": [
      { "rideId": "1", "distance": "10km", "fare": "$15" },
      { "rideId": "2", "distance": "5km", "fare": "$8" },
      { "rideId": "3", "distance": "20km", "fare": "$25" }
    ]
  }
  ```

- **500 Internal Server Error**: Returns a JSON object with an error message.
  ```json
  {
    "message": "Internal server error",
    "error": "error message"
  }
  ```

### /users/ridedetails/:rideId

**GET** `/users/ridedetails/:rideId`

Returns the details of a specific ride based on the ride ID.

#### Responses

- **200 OK**: Returns a JSON object containing the ride details.
  ```json
  {
    "rideId": "10ys5nkwzruicb",
    "vehicleDetails": {
      "vehicleType": "Sedan",
      "vehicleNumber": "DL5LMN1234",
      "vehicleName": "Honda City"
    },
    "pickupDetails": {
      "pickupTime": "2023-10-01T10:00:00Z",
      "pickupLocation": "Connaught Place, Delhi"
    },
    "dropoffDetails": {
      "dropoffTime": "2023-10-01T10:30:00Z",
      "dropoffLocation": "India Gate, Delhi"
    },
    "fare": {
      "rideFare": 150,
      "tax": 15,
      "paymentMethod": "Cash"
    },
    "driverName": "John Doe",
    "rideDate": "2023-10-01T10:00:00.000Z",
    "rideStatus": "Completed"
  }
  ```

- **404 Not Found**: Returns a JSON object with an error message.
  ```json
  {
    "message": "Ride not found"
  }
  ```

- **500 Internal Server Error**: Returns a JSON object with an error message.
  ```json
  {
    "message": "Internal server error",
    "error": "error message"
  }
  ```x