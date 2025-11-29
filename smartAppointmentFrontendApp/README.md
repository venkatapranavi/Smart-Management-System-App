# 📅 Smart Appointment Management System

A full-stack **Healthcare Appointment Management App** designed with **React Native** frontend and **Spring Boot** backend (Java), backed by **Neon Postgres** cloud database. It facilitates booking doctor appointments, real-time notifications, secure video consultations, role-based dashboards, and much more.

---

## 🚀 Features Overview

### 🔓 Authentication & Roles
- Common login for **Admin**, **Doctor**, and **User**
- Role-based navigation after login
- Secure user registration & password change

### 👤 User Module
- Profile view and update
- Search doctors by specialization
- Popular doctors showcased in Home screen
- Appointment booking with:
  - Day, Date, Time selection
  - Approval wait
  - Payment after approval
  - Scheduled video consultation
- In-app notification updates for:
  - Appointment booked
  - Approved
  - Payment success
  - Appointment completion

### 👨‍⚕️ Doctor Module
- Register and wait for **admin approval**
- Post-approval login access
- View appointments where selected by users
- Approve appointments based on availability
- Join video call after payment is done

### 🧑‍💼 Admin Module
- Login dashboard with stats:
  - Doctors, Patients, Appointments, Payments
- View all appointments
- Approve registered doctors

---

## 🧱 Folder Structure

```
AppointmentApp/
├── smartAppointmentFrontendApp/             # React Native frontend
│ ├── App.js
│ ├── assets/
│ │ └── (your images/screenshots)
│ ├── components/
│ └── screens/
│ └── (Home, Login, DoctorProfile, Appointment, etc.)
│
└── DoctorConsultantApp/                      # Spring Boot backend
├── src/
├── pom.xml
└── application.properties
```


---

## 🧰 Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Java Spring Boot
- **Database**: PostgreSQL (Neon DB)
- **Deployment**: Render (Java Backend)
- **Video Call**: Custom room ID per appointment (one room for user + doctor)

---

## 🌐 Backend Deployment

- Backend Hosted: [`https://smart-appointment-management-app.onrender.com`](https://smart-appointment-management-app.onrender.com)
- Database: [Neon Postgres Console](https://console.neon.tech/app/projects/shy-river-22797986/branches/br-dawn-bar-ad9fa590)

---

## 📦 Java Dependencies (Spring Boot)

```xml
<!-- pom.xml -->
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
```

## 📲 Screenshots

Added **UI** in the assets/ folder and reference them below:

### 1. Main Login Page
![Main Login](assets/login_main.png)

### 2. User Dashboard
![User Dashboard](assets/user_dashboard.png)

### 3. Doctor List by Specialization
![Doctor List](assets/doctor_list.png)

### 4. Appointment Booking
![Booking Page](assets/booking_page.png)

### 5. Notifications
![Notifications](assets/notifications.png)

### 6. Doctor Dashboard
![Doctor Dashboard](assets/doctor_dashboard.png)

### 7. Admin Dashboard
![Admin Dashboard](assets/admin_dashboard.png)



