# User Registration Endpoint

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body:
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

### Validation:
- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

### Responses:

#### Success:
- **Status Code: 201**
- **Body:**
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

#### Errors:
- **Status Code: 400**
  - **Description:** Validation errors or user already exists.
  - **Body:**
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

### Example Request:
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

# User Login Endpoint

## Endpoint: `/users/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body:
The request body should be a JSON object with the following structure:
```json
{
  "email": "string",
  "password": "string"
}
```

### Validation:
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Responses:

#### Success:
- **Status Code: 200**
- **Body:**
  ```json
  {
    "message":"You're successfully logged in to Fery Ride app"
  }
  ```

#### Errors:
- **Status Code: 400**
  - **Description:** Validation errors.
  - **Body:**
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

- **Status Code: 401**
  - **Description:** Invalid email or password.
  - **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### Example Request:
```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

# User Profile Endpoint

## Endpoint: `/users/profile`

### Method: GET

### Description:
This endpoint is used to retrieve the profile of the authenticated user.

### Headers:
- `Authorization`: Bearer token

### Responses:

#### Success:
- **Status Code: 200**
- **Body:**
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

#### Errors:
- **Status Code: 401**
  - **Description:** Unauthorized access.
  - **Body:**
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Example Request:
```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <token>"
```

# User Logout Endpoint

## Endpoint: `/users/logout`

### Method: GET

### Description:
This endpoint is used to log out the authenticated user.

### Headers:
- `Authorization`: Bearer token

### Responses:

#### Success:
- **Status Code: 200**
- **Body:**
  ```json
  {
    "message": "Logged out"
  }
  ```

#### Errors:
- **Status Code: 401**
  - **Description:** Unauthorized access.
  - **Body:**
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Example Request:
```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <token>"
```

# Ride API

## Endpoints

### /users/register
// ...existing documentation...

### /users/login
// ...existing documentation...

### /users/profile
// ...existing documentation...

### /users/logout
// ...existing documentation...

### /users/listride

**GET** `/users/listride`

Returns a list of mock rides with ride ID, distance, and fare.

#### Response

- **200 OK**: Returns a JSON object containing an array of rides.
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

- **500 Internal Server Error**: Returns a JSON object with an error message.
  ```json
  {
    "message": "Internal server error",
    "error": "error message"
  }
  ```

### /users/ridedetails/:rideId

**GET** `/users/ridedetails/:rideId`
`/users/ridedetails/10ys5nkwzruicb`

Returns the details of a specific ride based on the ride ID.

#### Response

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
  ```
