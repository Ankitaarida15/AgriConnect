# AgriConnect

**AI-powered Smart Agriculture Platform connecting farmers and buyers with digital solutions, smart recommendations, and market insights.**

---

## Live Demo

**Live Application:** `YOUR_VERCEL_URL`

**GitHub Repository:** `https://github.com/Ankitaarida15/AgriConnect`

**Demo Video:** `Coming Soon — YouTube Unlisted Link`

---

# Screenshots

## Home Page

![AgriConnect Home](screenshots/home.png)

## Dashboard & Products

![AgriConnect Dashboard](screenshots/dashboard.png)

## AI Assistant

![AgriConnect AI Assistant](screenshots/ai.png)

## User Profile

![AgriConnect Profile](screenshots/profile.png)

---

# Project Overview

AgriConnect is a full-stack agriculture platform that helps farmers sell their products directly to buyers. The platform provides product management, secure authentication, order management, and AI-powered assistance using the Google Gemini API.

The project was developed through a 10-week full-stack development journey covering project planning, frontend development, backend APIs, database integration, authentication, AI integration, frontend polishing, deployment, and final portfolio preparation.

---

# Week 1 — Project Setup & Planning

## Work Completed

* Project idea finalized: Smart Agriculture Platform
* AgriConnect project structure created
* Frontend and backend environment setup
* Technology stack selected
* Basic project planning completed

## Technologies Used

* Next.js
* Node.js
* Express.js
* PostgreSQL
* Prisma ORM

---

# Week 2 — Frontend Development & UI Design

## Work Completed

* Created responsive frontend interface
* Designed homepage and navigation system
* Added reusable components
* Implemented Tailwind CSS styling
* Created pages for:

  * Home
  * Login
  * Register
  * Dashboard

## Features Added

* Responsive UI design
* Navbar and Footer components
* User-friendly layouts

---

# Week 3 — Backend Development & API Creation

## Work Completed

* Created Express.js backend server
* Connected backend with database
* Created REST API endpoints

## API Features

* User APIs
* Product APIs
* Search API
* Order API
* AI Assistant API

## Database

* Prisma ORM integration
* PostgreSQL database setup

---

# Week 4 — Database Integration & CRUD Operations

## Work Completed

* Designed database schema
* Connected application with Supabase PostgreSQL
* Implemented CRUD operations

## CRUD Features

* Create products
* Read products
* Update products
* Delete products

## Database Models

* User
* Product
* Order

---

# Week 5 — Database Integration & Testing

## Work Completed

* Integrated all APIs with real database
* Tested API endpoints using Postman
* Added Prisma schema
* Created database schema diagram
* Verified CRUD operations

## Completed APIs

* User registration
* User login
* Product management
* Product search
* Order placement
* AI assistant

---

# Week 6 — Authentication & Security

## Work Completed

* Implemented secure user authentication
* Added password hashing
* Added JWT authentication
* Added Google OAuth login
* Protected API routes
* Added security practices

## Security Features

* bcrypt password encryption
* JWT token generation
* Protected frontend routes
* Input validation using express-validator
* Rate limiting for login security
* Secure CORS configuration

---

# Week 7 — AI API Integration

## Work Completed

* Integrated Google Gemini API
* Created AI Chat page
* Connected frontend with backend AI endpoint
* Added loading state while AI generates response
* Added error handling
* Stored API key securely using `.env`

## AI Feature

Users can ask agriculture-related questions and receive AI-powered responses using Google Gemini.

---

# Week 8 — Frontend Integration & Polish

## Work Completed

* Connected frontend pages and components to real backend data
* Replaced hardcoded/mock data with live API calls
* Implemented authenticated dashboard
* Connected dashboard data using JWT authentication
* Completed the AI feature user interface
* Added AI input, loading state, formatted output, and error handling
* Completed CRUD user flows
* Added input validation
* Added success and error states
* Performed responsive UI testing
* Improved layouts for mobile, tablet, and desktop
* Refined spacing, alignment, and UI consistency
* Added empty-state handling
* Added confirmation handling for destructive actions
* Added error handling for unexpected application states
* Checked API calls and frontend performance
* Improved unnecessary rendering and loading behaviour

## Responsive Testing

The application was reviewed for:

* Mobile — 375px
* Tablet — 768px
* Desktop — 1440px

---

# Week 9 — App Deployment & Go-Live

## Production Preparation

* Prepared frontend and backend for production
* Replaced localhost API references with environment variables
* Configured production CORS
* Verified environment variables were not committed
* Prepared the application for public deployment

## Frontend Deployment

The frontend was deployed using **Vercel**.

## Backend Deployment

The backend was deployed using **Render**.

## Database Deployment

The application uses **Supabase PostgreSQL** as the hosted database.

## Live Testing

The deployed application was tested for:

* Page loading
* User registration
* User login
* Dashboard functionality
* CRUD operations
* AI feature
* Authentication
* Profile functionality
* Production API communication

## Deployment Issues Resolved

During deployment, issues related to:

* Prisma configuration
* Database connection
* Environment variables
* Backend deployment
* Frontend/backend communication
* Authentication
* OAuth redirect configuration

were identified and resolved during the deployment process.

---

# Week 10 — Capstone & Portfolio

## Final Polish

* Reviewed application pages on desktop and mobile
* Checked core application flows
* Fixed critical bugs
* Verified registration and login
* Verified main application features
* Verified AI functionality
* Verified logout functionality

## Portfolio Preparation

The final project package includes:

* Live application
* GitHub repository
* Project README
* Application screenshots
* Demo video
* Technical documentation

## Demo Video

The demo video covers:

1. Project introduction
2. Register and login flow
3. Main application features
4. AI feature demonstration
5. Brief code and folder structure tour
6. Project learning outcomes and future improvements

**Demo Video:** `YOUR_YOUTUBE_UNLISTED_URL`

---

# Features

* User Registration and Login
* Google OAuth Authentication
* Farmer and Buyer roles
* Product listing and management
* Create, Read, Update and Delete product operations
* Product search
* Order placement system
* AI Assistant using Google Gemini API
* Secure authentication system
* JWT-based authentication
* PostgreSQL database integration
* Responsive user interface
* Production deployment

---

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL

## Authentication

* JWT
* bcrypt
* Passport.js
* Google OAuth

## AI

* Google Gemini API

## Database

* Supabase PostgreSQL

## Deployment

* Vercel — Frontend
* Render — Backend
* Supabase — Database

---

# Database

## Database Used

**Supabase PostgreSQL**

Supabase provides the hosted PostgreSQL database used by the application.

## Database Models

* User
* Product
* Order

## Database Schema

Add the database schema diagram here:

```text
Insert your database schema diagram image here
```

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Ankitaarida15/AgriConnect.git
cd AgriConnect
```

## 2. Install Frontend Dependencies

```bash
npm install
```

## 3. Install Backend Dependencies

```bash
cd backend
npm install
```

## 4. Configure Environment Variables

Create the required `.env` files and add the required environment variables for:

* Database connection
* JWT authentication
* Google Gemini API
* Google OAuth
* Frontend/backend API configuration

**Do not commit `.env` files to GitHub.**

## 5. Start the Backend

```bash
npm start
```

## 6. Start the Frontend

Open a new terminal and run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# API Documentation

The backend provides REST APIs for authentication, products, search, orders, and AI assistance.

## Authentication

### Register

```text
POST /register
```

Creates a new user account.

### Login

```text
POST /login
```

Authenticates the user and generates an authentication token.

---

## Products

### Get Products

```text
GET /products
```

Returns the available products.

### Search Products

```text
GET /products/search?q=searchTerm
```

Searches products based on the provided query.

### Create Product

```text
POST /products
```

Creates a new product.

### Update Product

```text
PUT /products/:id
```

Updates an existing product.

### Delete Product

```text
DELETE /products/:id
```

Deletes a product.

---

## AI Assistant

The AI endpoint connects the application with the Google Gemini API and allows users to ask agriculture-related questions.

```text
POST /ai
```

The request contains the user's question and the backend returns an AI-generated response.

---

# Architecture / Folder Structure

```text
AgriConnect/
│
├── app/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── profile/
│   └── ai/
│
├── backend/
│   ├── server.js
│   ├── prisma/
│   ├── routes/
│   ├── controllers/
│   └── passportConfig.js
│
├── components/
│   ├── Navbar
│   ├── Footer
│   └── reusable components
│
├── public/
│
├── package.json
├── README.md
└── ...
```

The frontend is implemented using Next.js, while the backend uses Node.js and Express.js. Prisma provides database access to the Supabase PostgreSQL database.

---

# Known Limitations

* Some advanced agriculture features are planned for future development.
* The application depends on external cloud services such as Supabase, Render, Vercel, and Google Gemini.
* Free-tier services may have usage and performance limitations.
* AI responses depend on the availability and limits of the Gemini API.
* Online payment functionality is not currently implemented.
* Real-time market price integration is planned for future development.
* Weather prediction and crop disease detection are planned future features.

---

# Future Improvements

* Online payment integration
* Weather prediction
* Crop disease detection
* Real-time market prices
* Mobile application
* More advanced farmer-focused recommendations
* Additional agriculture-related AI capabilities

---

# Credits & Acknowledgements

This project was developed as part of the **AI-Assisted Full Stack Web Development** internship/capstone program.

### Technologies & Services

* Next.js
* Node.js
* Express.js
* Prisma
* PostgreSQL
* Supabase
* Vercel
* Render
* Google Gemini API
* Tailwind CSS
* Passport.js

AI-assisted development tools and learning resources were used during the development process for debugging, implementation guidance, and project improvement.

---

# Project Status

**Status: Completed / Deployed**

AgriConnect is available as a deployed full-stack web application with frontend, backend, database, authentication, CRUD functionality, and AI-assisted features.

---

## Final Submission

| Requirement          | Status             |
| -------------------- | ------------------ |
| Live Application     | ✅                  |
| GitHub Repository    | ✅                  |
| README Documentation | ✅                  |
| Screenshots          | ✅                  |
| AI Feature           | ✅                  |
| Authentication       | ✅                  |
| Database             | ✅                  |
| CRUD Operations      | ✅                  |
| Frontend Deployment  | ✅                  |
| Backend Deployment   | ✅                  |
| Demo Video           | 🔄 To be added     |
| Self-Assessment      | 🔄 To be completed |
| Exit Survey          | 🔄 To be completed |
