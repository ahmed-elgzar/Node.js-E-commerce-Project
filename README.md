# Node.js E-commerce Project

This is a backend project for a simple E-commerce platform built using **Node.js** and **Express.js**. The goal is to create a clean and modular RESTful API.

## ✅ Features Implemented

- 🔧 Modular project structure with Express & Mongoose
- 📁 Full Category CRUD with validation (name, id)
- 🛡️ Request validation using express-validator
- ⚠️ Centralized error handling with custom error class
- 🔄 Global process error handling (e.g., unhandledRejection)

## 📁 Project Structure

├── config/ # Configuration files (e.g. DB connection)<br>
├── controllers/ # Logic for handling requests<br>
├── models/ # Mongoose schemas<br>
├── routes/ # Express route handlers<br>
├── server.js # Entry point of the app<br>
├── package.json # Project dependencies and scripts

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv
- nodemon
- Custom middleware for error handling
