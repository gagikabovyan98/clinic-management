# Clinic Management System

A full-stack application for managing patients, appointments, medical records, and rooms in a clinic.

---

### For Staff:
- Register and login
- Manage patients
- Create appointments
- Upload and view EHR (medical images)
- Manage rooms

### For Patients:
- Login
- View personal EHR records

---

## Tech Stack

- **Backend:** NestJS, TypeORM, PostgreSQL
- **Frontend:** React, Material UI
- **Auth:** JWT with Role-based Access Control (Staff / Patient)
- **File Upload:** Multer
- **Deployment:** Docker & Docker Compose

---

## Installation & Running

```bash
# Clone the repository
git clone https://github.com/your-username/clinic-management.git
cd clinic-management

# Start the project
docker-compose up --build