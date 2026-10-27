# E-Commerce Backend API

A Spring Boot RESTful API backend for an E-Commerce application with MySQL and Spring Data JPA.

---

## 📋 Table of Contents
- [Prerequisites](#-prerequisites)
- [Environment Configuration](#-environment-configuration)
- [Database Setup & Automatic Table Creation](#-database-setup--automatic-table-creation)
- [CORS Configuration](#-cors-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints Documentation](#-api-endpoints-documentation)
  - [1. Get All Products](#1-get-all-products)
  - [2. Get Product By ID](#2-get-product-by-id)
  - [3. Create / Add Product](#3-create--add-product)
  - [4. Update Product](#4-update-product)
  - [5. Delete Product](#5-delete-product)
- [Troubleshooting Table Creation](#-troubleshooting-table-creation)

---

## 🛠 Prerequisites
- **Java**: JDK 21+ (Java 21 or 25)
- **MySQL**: MySQL 8.0+ running locally or remotely
- **Maven**: Maven 3.8+ (or use the included `./mvnw`)

---

## ⚙ Environment Configuration

The backend reads configuration from `.env` (or environment variables) and falls back to `src/main/resources/application.properties`.

### `.env` File (`backend/.env`)
```env
DB_URL=jdbc:mysql://localhost:3306/animedb?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=4545
PORT=1206
```

### `application.properties` (`backend/src/main/resources/application.properties`)
```properties
spring.application.name=backend
server.port=${PORT:8080}
spring.config.import=optional:file:.env[.properties]

# MySQL Database Configuration
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/animedb?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:4545}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA & Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=animestyleecommercebackendjava!
jwt.expiration=54000000
```

---

## 🗄 Database Setup & Automatic Table Creation

### Automatic Creation
Thanks to `?createDatabaseIfNotExist=true` in the JDBC URL and `spring.jpa.hibernate.ddl-auto=update`, Hibernate and MySQL will **automatically**:
1. Create the `animedb` database if it does not already exist.
2. Create the `products` table matching `ProductModel.java` when the Spring Boot application boots up.

### Manual SQL Creation (Optional)
If you prefer to create the database and table manually in MySQL Workbench or CLI:
```sql
CREATE DATABASE IF NOT EXISTS animedb;
USE animedb;

CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    price DOUBLE,
    description VARCHAR(2000),
    category VARCHAR(255),
    image VARCHAR(1000),
    rate DOUBLE,
    count INT
);
```

---

## 🌐 CORS Configuration

All Cross-Origin requests are fully permitted:
- **Global Configuration**: `com.ecommerce.backend.config.CorsConfig` enables CORS for all endpoints (`/**`), all origins (`*`), all standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH`, `HEAD`), and all headers.
- **Controller-Level**: `@CrossOrigin(origins = "*", allowedHeaders = "*")` on `ProductController`.

---

## 🚀 Running the Application

In the `backend` folder:
```bash
./mvnw spring-boot:run
```
The server will start on port `1206` (or `8080` if PORT is not set).
Base URL: `http://localhost:1206`

---

## 📚 API Endpoints Documentation

Base URL: `http://localhost:1206/api/products`

### Summary Table
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/api/products` | Retrieve all products | `200 OK` |
| `GET` | `/api/products/{id}` | Retrieve single product by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/products` | Add a new product | `201 Created` |
| `PUT` | `/api/products/{id}` | Update an existing product | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/products/{id}` | Delete a product by ID | `204 No Content` / `404 Not Found` |

---

### 1. Get All Products

- **Method**: `GET`
- **URL**: `http://localhost:1206/api/products`
- **Headers**: `Accept: application/json`
- **Request Body**: None

#### Example Response
- **Status**: `200 OK`
```json
[
  {
    "id": 1,
    "title": "Naruto Uzumaki Sage Mode Figure",
    "price": 49.99,
    "description": "High quality 1/8 scale PVC figure of Naruto Uzumaki in Sage Mode with rasengan effects.",
    "category": "Figures",
    "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500",
    "rating": {
      "rate": 4.8,
      "count": 142
    }
  },
  {
    "id": 2,
    "title": "Attack on Titan Scout Regiment Hoodie",
    "price": 39.99,
    "description": "Comfortable cotton-blend green hoodie featuring the Scout Regiment Wings of Freedom emblem.",
    "category": "Clothing",
    "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    "rating": {
      "rate": 4.6,
      "count": 98
    }
  }
]
```

#### cURL Example
```bash
curl -X GET http://localhost:1206/api/products
```

---

### 2. Get Product By ID

- **Method**: `GET`
- **URL**: `http://localhost:1206/api/products/{id}`
- **Headers**: `Accept: application/json`
- **Path Parameter**: `id` (e.g. `1`)
- **Request Body**: None

#### Example Response (Success)
- **Status**: `200 OK`
```json
{
  "id": 1,
  "title": "Naruto Uzumaki Sage Mode Figure",
  "price": 49.99,
  "description": "High quality 1/8 scale PVC figure of Naruto Uzumaki in Sage Mode with rasengan effects.",
  "category": "Figures",
  "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500",
  "rating": {
    "rate": 4.8,
    "count": 142
  }
}
```

#### Example Response (Not Found)
- **Status**: `404 Not Found`

#### cURL Example
```bash
curl -X GET http://localhost:1206/api/products/1
```

---

### 3. Create / Add Product

- **Method**: `POST`
- **URL**: `http://localhost:1206/api/products`
- **Headers**: `Content-Type: application/json`

#### Example Request Body
```json
{
  "title": "Demon Slayer Tanjiro Kamado Nichirin Sword Replica",
  "price": 89.99,
  "description": "Carbon steel cosplay replica of Tanjiro Kamado's black Nichirin blade with sheath.",
  "category": "Cosplay",
  "image": "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500",
  "rating": {
    "rate": 4.9,
    "count": 65
  }
}
```

#### Example Response
- **Status**: `201 Created`
```json
{
  "id": 3,
  "title": "Demon Slayer Tanjiro Kamado Nichirin Sword Replica",
  "price": 89.99,
  "description": "Carbon steel cosplay replica of Tanjiro Kamado's black Nichirin blade with sheath.",
  "category": "Cosplay",
  "image": "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500",
  "rating": {
    "rate": 4.9,
    "count": 65
  }
}
```

#### cURL Example
```bash
curl -X POST http://localhost:1206/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Demon Slayer Tanjiro Kamado Nichirin Sword Replica",
    "price": 89.99,
    "description": "Carbon steel cosplay replica of Tanjiro Kamado'\''s black Nichirin blade with sheath.",
    "category": "Cosplay",
    "image": "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500",
    "rating": {
      "rate": 4.9,
      "count": 65
    }
  }'
```

---

### 4. Update Product

- **Method**: `PUT`
- **URL**: `http://localhost:1206/api/products/{id}`
- **Headers**: `Content-Type: application/json`
- **Path Parameter**: `id` (e.g. `3`)

#### Example Request Body
```json
{
  "title": "Demon Slayer Tanjiro Kamado Nichirin Sword Replica (Deluxe)",
  "price": 99.99,
  "description": "Upgraded deluxe carbon steel cosplay replica with display stand and leather sheath.",
  "category": "Cosplay",
  "image": "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500",
  "rating": {
    "rate": 5.0,
    "count": 72
  }
}
```

#### Example Response (Success)
- **Status**: `200 OK`
```json
{
  "id": 3,
  "title": "Demon Slayer Tanjiro Kamado Nichirin Sword Replica (Deluxe)",
  "price": 99.99,
  "description": "Upgraded deluxe carbon steel cosplay replica with display stand and leather sheath.",
  "category": "Cosplay",
  "image": "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500",
  "rating": {
    "rate": 5.0,
    "count": 72
  }
}
```

#### Example Response (Not Found)
- **Status**: `404 Not Found`

#### cURL Example
```bash
curl -X PUT http://localhost:1206/api/products/3 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Demon Slayer Tanjiro Kamado Nichirin Sword Replica (Deluxe)",
    "price": 99.99,
    "description": "Upgraded deluxe carbon steel cosplay replica with display stand and leather sheath.",
    "category": "Cosplay",
    "image": "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500",
    "rating": {
      "rate": 5.0,
      "count": 72
    }
  }'
```

---

### 5. Delete Product

- **Method**: `DELETE`
- **URL**: `http://localhost:1206/api/products/{id}`
- **Path Parameter**: `id` (e.g. `3`)
- **Request Body**: None

#### Example Response (Success)
- **Status**: `204 No Content`

#### Example Response (Not Found)
- **Status**: `404 Not Found`

#### cURL Example
```bash
curl -X DELETE http://localhost:1206/api/products/3
```

---

## 🔧 Troubleshooting Table Creation

If the `products` table is still not being created:
1. **Ensure MySQL is running**:
   ```bash
   sudo systemctl status mysql
   # or
   sudo service mysql start
   ```
2. **Verify MySQL credentials**:
   Check username and password in `.env` (`DB_USERNAME=root`, `DB_PASSWORD=4545`). Test logging in:
   ```bash
   mysql -u root -p4545
   ```
3. **Database Existence**:
   The JDBC URL now contains `createDatabaseIfNotExist=true`. If needed, manually create it:
   ```sql
   CREATE DATABASE IF NOT EXISTS animedb;
   ```
4. **Hibernate DDL Configuration**:
   Ensure `spring.jpa.hibernate.ddl-auto=update` and `spring.jpa.generate-ddl=true` are present in `application.properties`.

