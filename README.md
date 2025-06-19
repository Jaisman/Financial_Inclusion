# Financial Inclusion with GenAI

A web-based Generative AI-powered solution for enabling alternative credit scoring and promoting financial literacy among underbanked populations, built for the Salesforce Futureforce AI Challenge 2025.

## 🏆 Project Overview

This platform leverages Generative AI, explainable ML, and Retrieval-Augmented Generation (RAG) to address financial inclusion. Built as a modern web app with:

- **Frontend:** React (with Vite and Tailwind CSS)
- **Backend:** Node.js + Express
- **Database:** MongoDB

### Key Features

- **Alternative Credit Scoring:** Predicts user credit scores using synthetic data and ML models for users lacking formal credit history.
- **Explainable AI:** Uses SHAP values to explain scores, with Gemini API for user-friendly explanations.
- **Educational Chatbot:** Personalized RAG-based chatbot for financial literacy and awareness.
- **Scheme Discovery:** Workflow for users to discover and apply to eligible NGO or government support schemes.

---

## 🚀 Demo

_Coming soon!_

---

## 🖼️ Architecture

```
Frontend (React + Vite)  <--->  Backend (Node.js + Express)  <--->  MongoDB
         |                                 |                        |
         |---> RAG chatbot (EduChat)       |---> ML/SHAP API        |
         |---> Credit Score Dashboard      |---> User/Auth API      |
         |---> Scheme Application          |---> Data API           |
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Jaisman/Financial_Inclusion.git
cd Financial_Inclusion
```

### 2. Setup the backend

```bash
cd backend
npm install
# Make sure to update MongoDB connection string in backend/index.js if needed
npm start
```

### 3. Setup the flask backend
```bash
cd ../flask_backend
pip install -r requirements.txt
python app.py
```

### 4. Setup the frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Access the app

- Frontend runs on [http://localhost:5173](http://localhost:5173)
- Backend runs on [http://localhost:8000](http://localhost:8000)
- Flaks Backend runs on [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, Mongoose, JWT, CORS
- **Database:** MongoDB Atlas (or local MongoDB)
- **AI/ML:** SHAP, Gemini API, Gradient Boosting Regressor (ML code in `/flask_backend` or external service)
- **Other:** Axios, bcrypt, cookie-parser

---

## 💡 Solution Highlights

- **Synthetic Data Generation**: For alternative credit scoring, since real underbanked datasets are hard to find.
- **Explainable ML**: SHAP values integrated with Gemini API to generate user-friendly explanations.
- **RAG Chatbot**: EduChat guides users on financial literacy, via a floating button.
- **User Workflows**: Auth (login/register), profile management, dashboard, credit score insights, scheme application, financial quiz.

---

## 📁 Repository Structure

```
.
├── backend/           # Node.js + Express backend (user APIs, MongoDB models, ML integration)
├── frontend/          # React frontend (Vite, Tailwind, EduChat, dashboards, etc.)
├── flask_backend/     # Python backend for ML/SHAP/Gemini logic if needed
├── .vscode/           # Editor/IDE config
├── README.md
├── package.json
└── package-lock.json
```

---

## 🔑 Sample Code Highlights

- **Frontend Routing:** `frontend/src/App.jsx`
- **User Model:** `backend/models/user.js`
- **MongoDB Connection:** `backend/connection.js`
- **User API Routes:** `backend/routes/user.js`
- **Sample Data Insertion:** `backend/sample.js`

---

## 📝 How to Contribute

1. Fork this repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📚 References

- [SHAP Documentation](https://shap.readthedocs.io/)
- [Gemini API](https://ai.google.dev/gemini-api/docs/)
- [Gradient Boosting](https://scikit-learn.org/stable/modules/ensemble.html#gradient-boosting)
- [RAG Principles](https://www.pinecone.io/learn/retrieval-augmented-generation/)

---
