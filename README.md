# 🏥 Patient-Doctor Management Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

This is a **RESTful backend API** for managing **patients, doctors, and their mappings**.  
It also includes **user authentication** with JWT tokens.  

The service is built with:
- **Node.js & Express**
- **PostgreSQL** with **Sequelize ORM**
- **JWT & bcrypt** for secure authentication
- **Docker** for containerized deployment

---

## 🚀 Features

### 🔑 Authentication APIs
- `POST /api/auth/register/` → Register a new user with **name, email, and password**  
- `POST /api/auth/login/` → Log in and receive a **JWT token**  

### 🧑‍⚕️ Patient Management APIs (ID = PatentID)
- `POST /api/patients/` → Add a new patient (**Authenticated users only**)  
- `GET /api/patients/` → Retrieve all patients created by the logged-in user  
- `GET /api/patients/<id>/` → Get details of a specific patient  
- `PUT /api/patients/<id>/` → Update patient details  
- `DELETE /api/patients/<id>/` → Delete a patient record  

### 👨‍⚕️ Doctor Management APIs (ID = DocktorsID)
- `POST /api/doctors/` → Add a new doctor (**Authenticated users only**)  
- `GET /api/doctors/` → Retrieve all doctors  
- `GET /api/doctors/<id>/` → Get details of a specific doctor  
- `PUT /api/doctors/<id>/` → Update doctor details  
- `DELETE /api/doctors/<id>/` → Delete a doctor record  

### 🔗 Patient-Doctor Mapping APIs (ID = MappingsID)
- `POST /api/mappings/` → Assign a doctor to a patient  
- `GET /api/mappings/` → Retrieve all patient-doctor mappings  
- `GET /api/mappings/<patient_id>/` → Get all doctors assigned to a specific patient  
- `DELETE /api/mappings/<id>/` → Remove a doctor from a patient  

---

## 🐳 Run with Docker

You can pull and run the image directly from **Docker Hub** Don't enter env if you are using the docker.
⚠️ Note: This environment will be available for **3–4 days only** (for verification purposes).  

### 1️⃣ Pull the image
```bash
docker pull adkmboi/whatbytes
docker run -d -p 8000:8000 --name patient-doctor-backend adkmboi/whatbytes
```
### ENV will be available for (3 to 4) days after that whole things will be change. 
``` bash 
DATABASE_URL = postgresql://neondb_owner:npg_6KSXutsMW0dD@ep-muddy-silence-adrbf7fo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
ACCESS_TOKEN_SECRET = webbytes@123 
REFRESH_TOKEN_SECRET = webbytes@456
PORT = 8000
```

