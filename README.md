# Node.js E-commerce Project

This is a backend project for a simple E-commerce platform built using **Node.js** and **Express.js**. The goal is to create a clean and modular RESTful API.

## ✅ Features Implemented

- 🔧 Modular project structure with Express & Mongoose
- 📁 Full Category CRUD with validation (name, id)
- 🧩 Subcategory module with full CRUD support
- 📏 Subcategory input validation using express-validator
- 🛡️ Request validation using express-validator
- ⚠️ Centralized error handling with custom error class
- 🔄 Global process error handling (e.g., unhandledRejection)
- 🧹 ESLint integration for consistent code style

## 📁 Project Structure

├── config/ # Configuration files (e.g. DB connection)<br>
├── controllers/ # Logic for handling requests<br>
├── models/ # Mongoose schemas (Category, SubCategory, etc.)<br>
├── routes/ # Express route handlers<br>
├── utils/<br>
│ └── validators/ # Request validation schemas using express-validator<br>
├── middlewares/ # Error handling and custom middleware<br>
├── .eslintrc.json # ESLint configuration for code style consistency<br>
├── server.js # Entry point of the app<br>
├── package.json # Project dependencies and scripts<br>
└── README.md #

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv
- nodemon
- Custom middleware for error handling
