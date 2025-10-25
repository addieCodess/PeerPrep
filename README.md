# PeerPrep

Hey! This is **PeerPrep**, a platform I built to create and browse study modules. Super simple, modern, and sleek. Built with **MERN stack** + **TailwindCSS**.

---

## Features ✅

- Sign up / login (JWT auth)
- Create modules (title + description)
- See all modules
- Delete modules you made
- Logout clears modules instantly
- Modern dark + neon-blue UI

Optional touches I added:

- Modules show who created them
- Filter to see only "My Modules"
- Edit modules

---

## Tech Stack 💻

- **Frontend:** React, TailwindCSS, Vite
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt
- **Database:** MongoDB Atlas

---

## How to Run 🏃‍♀️

### Backend

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a .env file with:
   ```MONGO_URI=mongodb+srv://dbUser:YOUR_PASSWORD@cluster0.cvsjxxw.mongodb.net/?retryWrites=true&w=majority
   JWT_SECRET=yourSuperSecretKey
   ```
3. Run the backend server:
   ```bash
   npm run dev
   ```
4. The server should start on http://localhost:5000

### Frontend

1. Go to frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend:

   ```bash
   npm run dev
   ```

4. Open the URL shown in terminal (usually http://localhost:5173)

### Notes 📝

- Make sure your MongoDB Atlas connection works and .env is correct

- Login first to create or delete modules

- Logging out clears modules from the page

- Tested with multiple users; permissions work as expected
