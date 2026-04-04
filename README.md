# 🛍️ Christian E-Commerce Platform

📌 Overview

A full-stack e-commerce platform built with a focus on **real-world backend architecture, secure payments, and scalable system design**.

This project goes beyond a basic CRUD app by implementing:

* **Atomic stock management**
* **Secure payment workflows (Razorpay + Webhooks)**
* **Authentication & protected routes**
* **End-to-end order lifecycle**

---

## 🚀 Current Features

### 🛒 Product Catalog & Browsing

* Product listing with optimized API fetching
* Advanced filters:

  * Size
  * Color
  * Price
* Pagination for scalable product browsing
* Product detail pages with dynamic API data

---

### 👤 User Profile & Address Management

* Full CRUD operations for user addresses
* Profile page with optimized state handling
* Backend APIs for address persistence

---

### 🛍️ Cart & Checkout System

* Add to cart / remove from cart
* Cart state synchronization with backend
* Checkout flow with order review
* Authentication-protected checkout

---

### 📦 Order Management

* Order placement system
* Order history tracking
* Backend logic for handling order lifecycle

---

### 💳 Payments Integration

* Razorpay payment gateway integration
* Secure payment verification using webhooks
* Handling success and failure scenarios
* Backend-first validation (not trusting frontend)

---

### 📊 Inventory Control (Important)

* Atomic stock updates during purchase
* Prevents overselling in concurrent scenarios
* Real-world inventory logic implementation

---

### 🛠️ Admin Features (Basic)

* Admin order panel
* View incoming orders in real time
* Foundation for future admin dashboard

---

### 🔐 Authentication System

* JWT-based authentication
* Protected routes
* Login/logout flow (stabilized)

---

## 🧠 Engineering Highlights

* Designed with **real-world e-commerce challenges** in mind
* Focus on **data consistency (atomic updates)**
* Secure **payment verification using backend logic**
* Modular backend structure (controllers, routes, models)
* Incremental feature development with continuous bug fixing

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB / MySQL

### Integrations & Tools

* Razorpay (Payments)
* JWT (Authentication)
* Multer (File uploads)
* Postman (API testing)

---

## 🧪 Testing

* API endpoints tested using Postman
* Manual validation of:

  * Payment flows
  * Cart & checkout logic
  * Order placement edge cases

*(Automated testing with Jest/Supertest planned)*

---

## 📂 Project Structure

```bash
/client        → Frontend (React)
/server        → Backend (Node + Express)
/models        → Database schemas
/routes        → API routes
/controllers   → Business logic
/middleware    → Auth & error handling
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ASHJAX-CMD/Christian_ecommerce.git
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Run the project

```bash
# backend
npm run dev

# frontend
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the server folder:

```env
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
```

---

## 📸 Screenshots

No screenshots Yet will be uploading after deploying

---

## 🚧 Future Improvements

### 🔧 Product Features

* Search functionality
* Wishlist system
* Reviews & ratings
* Christian-specific features (theme-based enhancements)

### ⚙️ Engineering Improvements

* Full admin dashboard (products, users, analytics)
* Docker containerization
* CI/CD pipeline
* Deployment (cloud + production config)
* Automated testing (Jest + Supertest)

---

## 📈 Development Timeline

### Phase 1: Foundations (Feb 2026)

* Project setup (frontend + backend)
* Initial product fetching logic
* Basic UI components

### Phase 2: Product System

* Filters (size, color, price)
* Pagination
* Performance optimizations

### Phase 3: User System

* Address CRUD
* Profile improvements

### Phase 4: Cart & Orders

* Cart + checkout
* Order placement
* Stock management (atomic updates)

### Phase 5: Payments

* Razorpay integration
* Webhook security

### Phase 6: Admin & Polish

* Admin orders panel
* Bug fixes & UI improvements

---

## 🎯 Key Learning Outcomes

* Building **production-level backend systems**
* Handling **payments securely**
* Managing **state and data consistency**
* Designing **scalable application architecture**

---

## 🤝 Contributing

Open to improvements and suggestions.

---

## 📄 License

MIT License
