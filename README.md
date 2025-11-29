Smart Appointment Management System

A full-stack Healthcare Appointment Management Application built using:

React Native + Expo (Frontend)

Spring Boot (Java) (Backend)

Neon PostgreSQL (Cloud Database)

This application allows patients to book appointments, doctors to manage schedules, and admins to control the platform — complete with real-time notifications, secure video consultations, and role-based dashboards.

🚀 Features Overview
🔓 Authentication & Roles

Common login for Admin, Doctor, User

Role-based navigation

Secure registration + password management

👤 User Module

Profile view/update

Search doctors by specialization

Home screen with popular doctors

Appointment booking with:

Day, Date, Time

Approval waiting

Payment after approval

Scheduled video consultation

In-app notifications for:

Appointment booked

Approved

Payment completed

Appointment completed

👨‍⚕️ Doctor Module

Register and wait for admin approval

Access dashboard post approval

View user appointments

Approve based on availability

Join video consultation after payment

🧑‍💼 Admin Module

Dashboard with:

Total Doctors

Total Patients

Appointments

Payments

Approve doctors

View all appointments

🧱 Folder Structure
AppointmentApp/
│
├── smartAppointmentFrontendApp/      # React Native frontend
│   ├── App.js
│   ├── assets/
│   ├── components/
│   └── screens/
│
└── DoctorConsultantApp/             # Spring Boot backend
    ├── src/
    ├── pom.xml
    └── application.properties

🧰 Tech Stack
Layer	Technology
Frontend	React Native + Expo
Backend	Spring Boot (Java)
Database	Neon PostgreSQL
Deployment	Render (Backend), Docker
Video Call	Custom room ID per appointment
🌐 Backend Deployment

Backend Hosted On Render
(You can update the link after your deployment)

📦 Java Dependencies (Spring Boot)
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
  </dependency>
</dependencies>

⚙️ Setup & Installation
1. Clone your repository
git clone https://github.com/venkatapranavi/smartappMaster.git
cd smartappMaster

2. Configure Database

application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/smartapp_db
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080

3. Build Project
mvn clean install

4. Run Application
mvn spring-boot:run

🔗 API Endpoints
Admin APIs
Method	Endpoint	Description
POST	/api/admin/appointments	View all appointments
PUT	/api/admin/approve-doctor/{doctorId}	Approve doctor
GET	/api/admin/dashboard	Admin stats
Doctor APIs
Method	Endpoint	Description
POST	/api/doctor/register	Register doctor
POST	/api/doctorLogin	Doctor login
GET	/api/doctor/profile/{doctorId}	View doctor profile
GET	/api/doctor/search?specialization=Cardiology	Search doctors
User APIs
Method	Endpoint	Description
POST	/api/login	Common login
POST	/api/user/register	User registration
GET	/api/user/profile/{userId}	User profile
PUT	/api/user/profile/update/{userId}	Update profile
PUT	/api/user/change-password/{userId}	Change password
GET	/api/home/doctor/{doctorId}	Doctor details
GET	/api/notifications/USER/{userId}	View notifications
Appointment APIs
Method	Endpoint	Description
POST	/api/appointments/book	Book appointment
GET	/api/appointments/user/{userId}	Get user appointments
GET	/api/appointments/doctor/{doctorId}	Get doctor appointments
PUT	/api/appointments/approve/{appointmentId}	Approve appointment
PUT	/api/appointments/complete/{appointmentId}	Complete appointment
Payment APIs
Method	Endpoint	Description
POST	/api/payments/pay/{appointmentId}	Make payment
🐳 Deployment – Docker + Render + Neon
1. Build Jar
./mvnw clean package


Generates:
target/smartapp-backend-0.0.1-SNAPSHOT.jar

2. Dockerfile
# Stage 1: Build with Maven
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run with JDK
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/smartapp-backend-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/smartapp-backend-0.0.1-SNAPSHOT.jar"]

3. Set Environment Variables (PowerShell)
$env:DB_URL="jdbc:postgresql://your-neon-url"
$env:DB_USERNAME="your-neon-username"
$env:DB_PASSWORD="your-password"
$env:FRONTEND_URL="your_frontend_url"

4. Build Docker Image
docker build -t smartapp-backend .

5. Tag Image
docker tag smartapp-backend venkatapranavi/smartapp-deployment:v1

6. Push to Docker Hub
docker push venkatapranavi/smartapp-deployment:v1

🧠 Database – Neon PostgreSQL

Create Project

Create Database (e.g., smartapp-db)

Copy connection string:

jdbc:postgresql://ep-xxxxx.neon.tech/smartapp-db

🌍 Deploy on Render

Create Web Service → Select Docker Image

Set Environment Variables:

DB_URL=jdbc:postgresql://<neon-db-url>
DB_USERNAME=<your_neon_username>
DB_PASSWORD=<your_neon_password>
FRONTEND_URL=<your_frontend_url>

📞 Contact

For questions or collaboration:

📧 Email: venkatapranavik@gmail.com

🐙 GitHub: https://github.com/venkatapranavi
