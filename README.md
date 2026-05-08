
# 🛍️ Christian E-Commerce Platform

**A production-ready full-stack e-commerce platform** built with strong emphasis on backend engineering, scalability, data consistency, and real-world production practices.

---

## 🌐 Live Demo

- **Frontend**: [https://christian-ecommerce.vercel.app](https://christian-ecommerce.vercel.app)
- **Backend API**: https://christian-ecommerce.onrender.com

**Status**: ✅ Live & Functional

---

## 📌 Overview

This project goes beyond a typical CRUD application by implementing:

- Atomic inventory management (prevents overselling in concurrent scenarios)
- Secure payment workflows using **Razorpay + Webhooks**
- Real-time order notifications with **Socket.IO**
- Complete end-to-end order lifecycle management
- Production-grade architecture and security practices

---

## ✨ Current Features

### 🛒 Product System
- Optimized product listing with pagination
- Advanced filtering (Size, Color, Price range)
- Detailed product pages with dynamic data
- Skeleton loading states for smooth UX
- Cloudinary image upload & management

### 👤 User System
- JWT-based authentication & protected routes
- User profile management
- Address CRUD operations
- Secure state management

### 🛍️ Cart & Checkout
- Add/remove items with backend synchronization
- Persistent cart state
- Secure checkout flow with order review
- Auth-protected checkout process

### 📦 Order Management
- Complete order lifecycle tracking
- User order history
- Admin order monitoring & status updates
- Detailed order view with user & product data
- Refund handling system

### 💳 Payments & Security
- Razorpay payment gateway integration
- Secure webhook-based payment verification
- Backend-first validation (never trust frontend)
- Robust success/failure handling
- Admin refund processing

### 📊 Inventory Control (Core Strength)
- Atomic stock updates during checkout
- Prevents overselling even under concurrent requests
- Tight integration with payment flow

### 🛠️ Admin Dashboard
- Real-time statistics (Total orders, Revenue, Live products, Low stock alerts)
- Live orders monitoring
- Order status management
- Refund processing
- Clean UI with skeleton loaders

### 🔔 Real-time System
- Socket.IO integration for instant updates
- Real-time new order notifications for admin
- Toast notifications using React Toastify

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Redux Toolkit
- React Toastify
- Socket.IO Client

**Backend**
- Node.js + Express.js
- JWT Authentication
- Multer + Cloudinary

**Database**
- MongoDB Atlas
- Supabase (PostgreSQL)

**Integrations & Deployment**
- Razorpay (Payments + Webhooks)
- Socket.IO (Real-time)
- Cloudinary (Image Management)
- Vercel (Frontend)
- Render (Backend)

---

## 🧩 Engineering Challenges Solved

This project tackles several real-world e-commerce engineering problems:

- **Atomic Inventory Management** — Prevents overselling using atomic stock updates during concurrent purchases.
- **Secure Payment Verification** — Razorpay webhook signature validation with full backend trust model.
- **Real-time Admin Notifications** — Instant order alerts using Socket.IO.
- **Production Deployment Issues** — Handled environment variables, CORS, MongoDB Atlas connection, URI encoding, and Render platform quirks.
- **Performance & UX** — Optimized pagination, filtering, and skeleton loaders for better user experience.
- **Secure Authentication** — JWT-based protected routes and middleware.

---

## 🏗️ System Architecture

```text
Frontend (React + Vite) 
        ↓ (Hosted on Vercel)
        
REST API (Node.js + Express)
        ↓ (Hosted on Render)
        
Database Layer
├── MongoDB Atlas (Products, Orders, Cart, etc.)
└── Supabase (PostgreSQL - Users, Addresses, etc.)

External Services
├── Razorpay (Payments + Webhooks)
├── Cloudinary (Image Upload & Optimization)
└── Socket.IO (Real-time Notifications)
```

---

## 🚀 Version 2 (Upcoming)

- Full Docker + Docker Compose setup
- AWS deployment
- CI/CD pipeline
- Redis caching
- Advanced search functionality
- Automated test suite

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

MIT License

---

**Made with ❤️ for learning production-grade full-stack development.**

```

---


