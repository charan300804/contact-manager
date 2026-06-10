# Contact Manager - Full Stack MERN Application

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript&style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)




A modern, responsive Contact Management Dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a clean, medical-dashboard-inspired UI with real-time search, alphabetical grouping, and smooth animations.

## 🚀 Features

- **Dashboard Interface**: Elegant "Have a nice day" greeting with real-time stats.
- **Contact Management**: Create, Read, and Delete contacts.
- **Real-time Search**: instantly filter contacts by name or phone number.
- **Alphabetical Grouping**: Contacts are automatically organized by their first letter (A-Z).
- **Smart Avatars**: Auto-generated colorful avatars based on contact initials.
- **Modern UI/UX**:
    - Glassmorphism effects and soft gradients.
    - Framer Motion animations for list transitions.
    - React Hot Toast for beautiful notifications.
    - Fully responsive layout (Mobile & Desktop).

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Hot Toast (Notifications)
- Axios (API Integration)

**Backend:**
- Node.js & Express.js
- MongoDB (Database)
- Mongoose (ODM)
- CORS & Dotenv

## 📦 Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port `27017`

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd contact-manager
```

### 2. Backend Setup
 Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact-app
```
Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory:
```bash
cd ../client
npm install
```
Start the frontend development server:
```bash
npm run dev
# Client will run on http://localhost:5173
```

## 📱 Usage
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Use the **Quick Add** form on the left to save a new contact.
3. View your contacts on the right, grouped alphabetically.
4. Use the **Search Bar** to find specific people instantly.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).