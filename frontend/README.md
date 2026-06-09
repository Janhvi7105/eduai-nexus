# 🎓 EduAI Nexus

An AI-powered E-Learning Platform built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) that connects students, instructors, and administrators on a single intelligent learning platform.

---

## 🚀 Overview

EduAI Nexus is a modern online learning platform designed to provide seamless course management, student learning, instructor tools, AI-powered assistance, online payments, certifications, and analytics.

The platform supports three major roles:

* 👨‍🎓 Students
* 👩‍🏫 Instructors
* 👨‍💼 Administrators

Students can enroll in courses, access notes, attempt mock tests, chat with an AI study assistant, track progress, and earn certificates.

Instructors can create and manage courses, upload study materials, manage notes, and monitor student engagement.

Administrators have complete control over users, courses, revenue, and platform activities.

---

# ✨ Key Features

## 👨‍🎓 Student Features

* User Registration & Login
* JWT Authentication
* Browse Available Courses
* Course Enrollment
* Online Payment Integration (Razorpay)
* Course Learning Dashboard
* Progress Tracking
* Download Course Notes
* Mock Tests & Assessments
* AI Study Assistant (Gemini AI)
* Certificate Generation
* Notifications System
* Personalized Learning Experience

---

## 👩‍🏫 Instructor Features

* Instructor Registration
* Course Creation & Management
* Upload Course Materials
* Upload PDF Notes
* Edit Notes
* Delete Notes
* Manage Course Content
* View Student Enrollments
* Course Analytics

---

## 👨‍💼 Admin Features

* Admin Dashboard
* User Management
* Student Management
* Instructor Management
* Course Approval & Management
* Revenue Dashboard
* Platform Monitoring
* Analytics & Reports

---

# 🤖 AI Study Assistant

EduAI Nexus includes a built-in AI chatbot powered by Google Gemini.

Students can:

* Ask study-related questions
* Get learning guidance
* Receive educational explanations
* Improve understanding of concepts

---

# 💳 Payment Gateway

Integrated with Razorpay for secure payments.

### Features

* Course Purchase
* Payment Verification
* Enrollment after Successful Payment
* Revenue Tracking

---

# 📚 Notes Management System

### Instructor

* Upload Notes
* Edit Notes
* Delete Notes

### Student

* View Notes
* Download Notes

All updates made by instructors are reflected in the student portal.

---

# 🏆 Certificate Generation

Students automatically receive certificates upon successful course completion.

Certificate includes:

* Student Name
* Course Name
* Completion Date
* Digital Signature

---

# 📊 Revenue Analytics

Admin dashboard includes:

* Total Revenue
* Course Sales
* Enrollment Statistics
* Platform Performance Metrics

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Axios
* CSS
* Responsive UI

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## AI

* Google Gemini API

## Payment

* Razorpay

## Cloud & Storage

* Cloudinary
* Multer

---

# 📁 Project Structure

```bash
EduAI-Nexus/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.js
│
└── package.json
```

# ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Janhvi7105/eduai-nexus.git
```

### Install Dependencies

```bash
npm install

cd backend
npm install

cd ../frontend
npm install
```

### Configure Environment Variables

Create a `.env` file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret

GEMINI_API_KEY=your_gemini_key

EMAIL_USER=your_email

EMAIL_PASS=your_password
```

### Run Project

```bash
npm run dev
```

Frontend:

```bash
http://localhost:3000
```

Backend:

```bash
http://localhost:5000
```

---

# 📸 Screenshots

Add screenshots of:

* Login Page
* Student Dashboard
* Instructor Dashboard
* Admin Dashboard
* Notes Management
* AI Chatbot
* Certificate Page
* Revenue Dashboard

---

# 🌟 Future Enhancements

* Live Video Classes
* AI Course Recommendations
* Discussion Forums
* Attendance Tracking
* Mobile Application
* Real-time Notifications
* Advanced Analytics

---

# 👩‍💻 Developer

**Janhvi Anil Ghuikar**

Full Stack Developer | MERN Stack Enthusiast

GitHub: https://github.com/Janhvi7105

---

## ⭐ Support

If you like this project, don't forget to star the repository and share your feedback.
