# AgriConnect 🌾

**AI-Powered Smart Agriculture Platform**

AgriConnect is a full-stack smart agriculture platform designed to connect farmers and buyers through digital product management, secure authentication, product search, order management, and AI-powered agricultural assistance.

---

## 📌 Project Overview

AgriConnect helps farmers list and manage agricultural products while allowing buyers to discover products and place orders.

The platform combines a modern **Next.js frontend**, **Node.js/Express backend**, **PostgreSQL database**, **Prisma ORM**, and **Google Gemini AI** to provide a complete digital agriculture solution.

### Main Objectives

* Connect farmers and buyers digitally
* Provide secure user authentication
* Allow farmers to manage agricultural products
* Allow buyers to search and explore products
* Provide AI-powered agricultural assistance
* Store application data securely in a PostgreSQL database
* Deploy the application for real-world access

---

# Week 1 — Project Setup & Planning

## Work Completed

* Finalized project idea: Smart Agriculture Platform
* Selected project name: AgriConnect
* Created initial project structure
* Planned frontend and backend architecture
* Selected the technology stack
* Set up the development environment

## Technologies Selected

* Next.js
* TypeScript
* Node.js
* Express.js
* PostgreSQL
* Prisma ORM

---

# Week 2 — Frontend Development & UI Design

## Work Completed

* Created responsive frontend interface
* Designed homepage
* Created navigation system
* Added reusable components
* Implemented Tailwind CSS
* Created basic application pages

## Pages Created

* Home
* About
* Login
* Register
* Dashboard
* AI Assistant
* Profile

## UI Features

* Responsive design
* Navigation bar
* Footer
* Reusable UI components
* User-friendly layouts
* Theme support

---

# Week 3 — Backend Development & API Creation

## Work Completed

* Created Node.js and Express.js backend
* Configured backend server
* Connected backend with database
* Created REST API endpoints
* Added middleware for authentication and authorization

## API Features

* User registration
* User login
* Product management
* Product search
* Order management
* AI assistant endpoint

## Backend Technologies

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt

---

# Week 4 — Database Integration & CRUD Operations

## Work Completed

* Designed database structure
* Integrated PostgreSQL database
* Connected Prisma ORM
* Implemented CRUD operations
* Created database models

## CRUD Operations

### Create

Farmers can add agricultural products.

### Read

Users can view available products.

### Update

Product information can be updated.

### Delete

Products can be removed when required.

## Main Database Models

* User
* Product
* Order

---

# Week 5 — Database Testing & API Testing

## Work Completed

* Connected APIs with the real database
* Tested backend APIs using Postman
* Verified CRUD operations
* Tested product search
* Tested authentication APIs
* Checked database responses
* Added and verified Prisma schema

## APIs Tested

* User Registration
* User Login
* Product Creation
* Product Listing
* Product Update
* Product Deletion
* Product Search
* Order Operations
* AI Assistant

---

# Week 6 — Authentication & Security

## Work Completed

* Implemented secure user authentication
* Added password hashing
* Implemented JWT authentication
* Added Google OAuth authentication
* Protected API routes
* Added role-based access
* Added security middleware

## Security Features

* bcrypt password hashing
* JWT token authentication
* Protected routes
* Input validation
* Rate limiting
* CORS configuration
* Environment variables for sensitive information

## Authentication Methods

* Email and password
* Google OAuth

---

# Week 7 — AI API Integration

## Work Completed

* Integrated Google Gemini API
* Created AI Assistant page
* Connected frontend with backend AI endpoint
* Added loading state
* Added error handling
* Secured Gemini API key using environment variables

## AI Feature

Users can ask agriculture-related questions and receive AI-powered responses.

The AI assistant can help users with agriculture-related information and general farming questions.

---

# Week 8 — Frontend Integration & Polish

## Work Completed

* Connected frontend with backend APIs
* Integrated product data from the database
* Improved Dashboard page
* Added product search functionality
* Integrated authentication with frontend
* Improved Login and Register flow
* Added Profile page
* Connected AI Assistant with backend
* Improved responsive design
* Fixed frontend and backend integration issues
* Improved overall UI consistency

## Frontend Features Completed

* User registration
* User login
* User profile
* Product listing
* Product search
* Product management
* AI Assistant
* Dashboard
* Responsive navigation

## UI Improvements

* Improved page layouts
* Improved navigation
* Improved loading states
* Improved error handling
* Improved mobile responsiveness
* Improved overall user experience

---

# Week 9 — Testing, Deployment & Bug Fixing

## Work Completed

* Tested frontend functionality
* Tested backend APIs
* Tested authentication
* Tested database operations
* Tested AI Assistant
* Fixed deployment-related issues
* Configured environment variables
* Configured production database
* Deployed backend
* Prepared frontend for production deployment

## Testing Performed

### Authentication Testing

* Registration tested
* Login tested
* JWT authentication tested
* Google OAuth tested
* Protected routes tested

### Product Testing

* Add product tested
* View products tested
* Update product tested
* Delete product tested
* Search functionality tested

### AI Testing

* AI request tested
* AI response tested
* Loading state tested
* Error handling tested

### Database Testing

* PostgreSQL connection verified
* Prisma connection verified
* CRUD operations verified

---

# Week 10 — Capstone & Portfolio

## Final Project Work

Week 10 focused on completing, polishing, documenting, and preparing AgriConnect as a final portfolio project.

## Work Completed

* Completed major frontend features
* Completed backend integration
* Completed authentication system
* Completed database integration
* Completed AI Assistant
* Fixed major bugs
* Improved UI
* Added project screenshots
* Updated project documentation
* Prepared final README
* Prepared project for submission
* Deployed the application

## Final Deliverables

* Full-stack AgriConnect application
* Frontend
* Backend
* PostgreSQL database
* Authentication system
* Product management system
* Search functionality
* AI Assistant
* Deployment
* GitHub repository
* Project documentation
* Screenshots

---

# 🚀 Features

* User Registration and Login
* Google OAuth Authentication
* Farmer and Buyer roles
* User Profile
* Product Listing
* Add Product
* Update Product
* Delete Product
* Product Search
* Order Management
* AI Agriculture Assistant
* Secure Authentication
* PostgreSQL Database
* Responsive UI
* REST APIs
* Production Deployment

---

# 🗄️ Database

AgriConnect uses **Supabase PostgreSQL** as its cloud database.

## Database Models

* User
* Product
* Order

## Why PostgreSQL?

PostgreSQL provides reliable relational data storage and works well with Prisma ORM for full-stack applications.

---

# 🧩 Database Schema

The database contains relationships between users, products, and orders.

A database schema diagram can be added here:

```text
User
 │
 ├── Products
 │
 └── Orders
       │
       └── Products
```

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* Prisma ORM

## Database

* PostgreSQL
* Supabase

## Authentication

* JWT
* bcrypt
* Passport.js
* Google OAuth

## AI

* Google Gemini API

## Testing

* Postman

## Deployment

* Render
* Vercel

---

# 📁 Project Structure

```text
AgriConnect
│
├── app
│   ├── login
│   ├── register
│   ├── dashboard
│   ├── profile
│   └── ai
│
├── backend
│   ├── server.js
│   ├── routes
│   ├── controllers
│   ├── prisma
│   └── passportConfig.js
│
├── components
│
├── public
│
├── prisma
│
├── screenshots
│   ├── home.png
│   ├── dashboard.png
│   ├── ai.png
│   └── profile.png
│
├── package.json
├── README.md
└── .env.local
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Ankitaarida15/AgriConnect.git
```

## 2. Open the Project

```bash
cd AgriConnect
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create the required environment files and add the required configuration such as:

```text
DATABASE_URL
JWT_SECRET
GEMINI_API_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

Do not upload secret keys or passwords to GitHub.

## 5. Start the Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 6. Start the Backend

Open the backend directory and start the Express server using the configured backend start command.

The backend runs on the configured server port.

---

# 📸 Screenshots

## Home Page

![AgriConnect Home](screenshots/home.png)

## Dashboard

![AgriConnect Dashboard](screenshots/dashboard.png)

## AI Assistant

![AgriConnect AI Assistant](screenshots/ai.png)

## Profile

![AgriConnect Profile](screenshots/profile.png)

---

# 🌐 Deployment

The AgriConnect backend has been configured for production deployment using Render.

The frontend is prepared for production deployment using Vercel.

Environment variables are configured separately for the production environment.

---

# 🔗 GitHub Repository

**AgriConnect GitHub Repository**

https://github.com/Ankitaarida15/AgriConnect

---

# 📊 Project Status

| Module               | Status      |
| -------------------- | ----------- |
| Project Setup        | ✅ Completed |
| Frontend UI          | ✅ Completed |
| Backend API          | ✅ Completed |
| Database             | ✅ Completed |
| CRUD Operations      | ✅ Completed |
| Authentication       | ✅ Completed |
| Google OAuth         | ✅ Completed |
| Product Search       | ✅ Completed |
| AI Assistant         | ✅ Completed |
| Frontend Integration | ✅ Completed |
| Testing              | ✅ Completed |
| Deployment           | ✅ Completed |
| Documentation        | ✅ Completed |
| Screenshots          | ✅ Completed |

---

# 🔮 Future Improvements

* Online payment integration
* Real-time market prices
* Weather prediction
* Crop disease detection
* Advanced AI crop recommendations
* Real-time notifications
* Mobile application
* Multilingual support
* Advanced farmer analytics

---

# 🎯 Conclusion

AgriConnect successfully demonstrates how modern web technologies and artificial intelligence can be combined to build a practical smart agriculture platform.

The project provides farmers and buyers with a digital platform for product management, secure authentication, product discovery, and AI-powered agricultural assistance.

The final application combines:

**Next.js + Express.js + PostgreSQL + Prisma + Google Gemini AI**

to create a scalable and user-friendly agriculture solution.

---

# 👩‍💻 Project

**Project Name:** AgriConnect
**Type:** Full-Stack AI-Powered Agriculture Platform
**Frontend:** Next.js
**Backend:** Node.js + Express.js
**Database:** PostgreSQL / Supabase
**ORM:** Prisma
**AI:** Google Gemini API
