# 🛍️ Christian E-Commerce Platform

## 📌 Overview

A full-stack e-commerce platform built with a strong focus on **real-world backend engineering, scalability, and production-ready architecture**.

This project goes beyond a typical CRUD application by implementing:

* Atomic inventory management (prevents overselling)
* Secure payment workflows using Razorpay + Webhooks
* Real-time order notifications (Socket.IO)
* Dockerized multi-service architecture
* End-to-end order lifecycle management

---

## 🚀 Current Features

### 🛒 Product System

* Product listing with optimized API fetching
* Advanced filtering:

  * Size
  * Color
  * Price
* Pagination for scalable browsing
* Product detail pages with dynamic data
* Skeleton loading UI for better UX

---

### 👤 User System

* JWT-based authentication
* Protected routes
* Profile management
* Address CRUD (Create, Read, Update, Delete)
* Optimized state handling on frontend

---

### 🛍️ Cart & Checkout

* Add/remove items from cart
* Backend-synced cart state
* Secure checkout flow
* Order review before payment
* Auth-protected checkout

---

### 📦 Order Management

* Complete order lifecycle handling
* Order history tracking (user side)
* Admin order monitoring
* Order details with user + product data
* Order status updates (admin controlled)

---

### 💳 Payments & Security

* Razorpay payment gateway integration
* Secure webhook-based payment verification
* Backend-first validation (never trusting frontend)
* Handling success/failure flows robustly
* Refund functionality via admin panel

---

### 📊 Inventory Control (Core Feature)

* Atomic stock updates during purchase
* Prevents overselling in concurrent scenarios
* Tight integration with checkout & payment flow

---

### 🛠️ Admin Dashboard (Advanced)

* Dashboard with real-time statistics:

  * Total orders
  * Pending / Completed / Cancelled
  * Live products
  * Low stock alerts
* Live orders monitoring
* Order details view
* Order status management
* Refund handling system
* Skeleton UI for admin pages

---

### 🔔 Real-time System (NEW)

* Socket.IO integration (frontend + backend)
* Real-time order notifications for admin
* Instant updates when new orders are placed
* Toast notifications using React Toastify

---

### 🐳 Dockerized Architecture (NEW)

* Fully containerized backend system
* Multi-container setup:

  * Node.js backend
  * MySQL
  * MongoDB
* Service communication via Docker network
* Environment-based configuration handling

---

## 🧠 Engineering Highlights

* Designed with **real-world e-commerce challenges**
* Strong focus on:

  * Data consistency
  * Secure payment verification
  * Scalable architecture
* Backend structured using:

  * Controllers
  * Routes
  * Middleware
  * Models
* Incremental development with continuous debugging & optimization

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* MySQL

### Integrations & Tools

* Razorpay (Payments)
* Socket.IO (Real-time)
* JWT (Authentication)
* Multer (File handling)
* Docker (Containerization)
* Postman (API testing)

---

## 📂 Project Structure

```
Christian_ecommerce/
├── backend/      # Node.js + Express + APIs + Docker setup
├── frontend/     # React + UI + Admin dashboard
```

---

## ⚙️ Getting Started

### 1. Clone repository

```
git clone https://github.com/ASHJAX-CMD/Christian_ecommerce.git
```

---

### 2. Run with Docker (Recommended)

```
cd backend
docker compose up --build
```

---

### 3. Run manually (optional)

#### Backend

```
cd backend
npm install
npm run dev
```

#### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` inside `backend/`:

```
PORT=5000

# Database
MONGO_URI=your_mongo_url
MYSQL_DATABASE=your_db
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password

# Auth
JWT_SECRET=your_secret

# Payments
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Realtime
SOCKET_PORT=your_port
```

---

## 🧪 Testing

* API testing using Postman
* Manual validation of:

  * Payment flow
  * Cart & checkout
  * Order lifecycle
  * Admin actions

> Automated testing (Jest + Supertest) planned

---

## 🚧 Future Improvements

### 🔧 Product Features

* Search functionality
* Wishlist system
* Reviews & ratings
* Christian-themed UI & personalization

### ⚙️ Engineering Improvements

* Full CI/CD pipeline
* Cloud deployment (AWS)
* S3/Cloudinary media storage
* Advanced caching (Redis)
* Automated testing suite

---

## 📈 Development Timeline

### Phase 1: Foundations

* Project setup
* Basic product APIs
* Initial UI

### Phase 2: Product System

* Filters + pagination
* Performance improvements

### Phase 3: User System

* Address CRUD
* Profile system

### Phase 4: Cart & Orders

* Checkout flow
* Atomic stock handling

### Phase 5: Payments

* Razorpay integration
* Webhook security

### Phase 6: Advanced Features

* Admin dashboard
* Real-time notifications
* Dockerization

---

## 🎯 Key Learning Outcomes

* Building production-level backend systems
* Secure payment handling using webhooks
* Designing scalable architecture
* Managing concurrency & data consistency
* Real-time system design (Socket.IO)
* Containerized development workflows (Docker)

---

## 🤝 Contributing

Open to improvements, suggestions, and collaborations.

---

## 📄 License

MIT License
