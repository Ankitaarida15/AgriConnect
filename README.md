# AgriConnect

AI-powered Smart Agriculture Platform connecting farmers and buyers with digital solutions, smart recommendations, and market insights.

---

# Project Overview

AgriConnect is a full-stack agriculture platform that helps farmers sell their products directly to buyers. The platform provides product management, secure authentication, order management, and AI-powered assistance using Google Gemini API.

---

# Week 1 — Project Setup & Planning

## Work Completed
- Project idea finalized: Smart Agriculture Platform
- AgriConnect project structure created
- Frontend and backend environment setup
- Technology stack selected
- Basic project planning completed

## Technologies Used
- Next.js
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

---

# Week 2 — Frontend Development & UI Design

## Work Completed
- Created responsive frontend interface
- Designed homepage and navigation system
- Added reusable components
- Implemented Tailwind CSS styling
- Created pages for:
  - Home
  - Login
  - Register
  - Dashboard

## Features Added
- Responsive UI design
- Navbar and Footer components
- User-friendly layouts

---

# Week 3 — Backend Development & API Creation

## Work Completed
- Created Express.js backend server
- Connected backend with database
- Created REST API endpoints

## API Features
- User APIs
- Product APIs
- Search API
- Order API
- AI Assistant API

## Database
- Prisma ORM integration
- PostgreSQL database setup

---

# Week 4 — Database Integration & CRUD Operations

## Work Completed
- Designed database schema
- Connected application with Supabase PostgreSQL
- Implemented CRUD operations

## CRUD Features
- Create products
- Read products
- Update products
- Delete products

## Database Models
- User
- Product
- Order

---

# Week 5 — Database Integration & Testing

## Work Completed
- Integrated all APIs with real database
- Tested API endpoints using Postman
- Added Prisma schema
- Created database schema diagram
- Verified CRUD operations

## Completed APIs
- User registration
- User login
- Product management
- Product search
- Order placement
- AI assistant

---

# Week 6 — Authentication & Security

## Work Completed
- Implemented secure user authentication
- Added password hashing
- Added JWT authentication
- Added Google OAuth login
- Protected API routes
- Added security practices

## Security Features
- bcrypt password encryption
- JWT token generation
- Protected frontend routes
- Input validation using express-validator
- Rate limiting for login security
- Secure CORS configuration

---

# Features

- User Registration and Login
- Google OAuth Authentication
- Farmer and Buyer roles
- Product listing and management
- Product search
- Order placement system
- AI Assistant using Gemini API
- Secure authentication system
- Database integration

---

# Database Used

Supabase (PostgreSQL)

## Why Supabase?

Supabase provides a free PostgreSQL database with cloud storage and easy integration with full-stack applications.

---

# Database Schema

(Insert your schema diagram image here)

---

# Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Authentication
- JWT
- bcrypt
- Passport.js
- Google OAuth

## AI
- Google Gemini API

---

# Installation & Setup

1. Clone the repository.

2. Install dependencies:

3. Create a `.env` file.

4. Add required variables:
  
5. Start backend server:

6. Run frontend:

AgriConnect
│
├── app
│ ├── login
│ ├── register
│ └── dashboard
│
├── backend
│ ├── server.js
│ ├── prisma
│ ├── routes
│ ├── controllers
│ └── passportConfig.js
│
└── components

---

# Future Improvements

- Online payment integration
- Weather prediction
- Crop disease detection
- Real-time market prices
- Mobile application

