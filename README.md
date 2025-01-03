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

### 1. User Registration
1. **Endpoint:** `/users/register`
2. **Method:** `POST`
3. **Body:**
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

### 2. List Rides
1. **Endpoint:** `/users/listrides`
2. **Method:** `GET`
3. **Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
4. **Responses:**
    - **200 OK:** Returns a JSON object containing an array of rides.
      ```json
      {
        "rides": [
          { "rideId": "10ys5nkwzruicb", "distance": "10km", "fare": "Rs15" },
          { "rideId": "yc62gyyyq7exz", "distance": "5km", "fare": "Rs8" },
          { "rideId": "ht4u26dq1konh", "distance": "20km", "fare": "Rs25" },
          { "rideId": "yvuwy6oyxyry", "distance": "15km", "fare": "Rs18" },
          { "rideId": "8exfeildz3jll", "distance": "7km", "fare": "Rs10" }
        ]
      }
      ```
    - **500 Internal Server Error:** Returns a JSON object with an error message.
      ```json
      {
        "message": "Internal server error",
        "error": "error message"
      }
      ```

### 3. Get Ride Details
1. **Endpoint:** `/users/ridedetails/:rideId`
2. **Method:** `GET`
3. **Responses:**
    - **200 OK:** Returns a JSON object containing the ride details.
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
    - **404 Not Found:** Returns a JSON object with an error message.
      ```json
      {
        "message": "Ride not found"
      }
      ```
    - **500 Internal Server Error:** Returns a JSON object with an error message.
      ```json
      {
        "message": "Internal server error",
        "error": "error message"
      }
      ```