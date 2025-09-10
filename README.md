# 🖥️ Task Manager Frontend

This is the **React (Vite)** frontend for the Task Manager App.  
It allows users to **register, login, and manage tasks** (create, update, delete, search, filter).

---

## 🚀 Tech Stack
- React (Vite)
- React Context API (Auth state management)
- Axios (API calls)
- TailwindCSS / CSS modules
- Custom Hooks (debounce)

---

## 📂 Project Structure
frontend/
├── public/ # static assets
├── src/
│ ├── api/ # API helpers (axios instance)
│ │ └── axios.js
│ ├── assets/ # images/icons
│ ├── components/ # reusable UI
│ │ ├── TaskForm.jsx
│ │ └── TaskItem.jsx
│ ├── constants/ # constants for API, messages
│ │ ├── api.js
│ │ ├── messages.js
│ │ └── options.js
│ ├── context/ # Auth context
│ │ ├── AuthContext.jsx
│ │ └── AuthProvider.jsx
│ ├── hooks/ # custom hooks
│ │ └── useDebounce.js
│ ├── pages/ # pages (routed in App.jsx)
│ │ ├── Dashboard.jsx
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ └── main.jsx
├── .env
├── vite.config.js
└── package.json

---

## 🔧 Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/99-tejrajdewangan/task-management-frontend
cd task-manager-frontend

2. Install dependencies
npm install

3. Configure environment variables
Create a .env file in root:
VITE_API_URL=https://task-management-backend-3-fsye.onrender.com
👉 Change this to your deployed backend when live:
VITE_API_URL=https://task-management-backend-3-fsye.onrender.com

4. Run frontend (dev mode)
npm run dev
App will run on → http://localhost:5173

🔗 Available Pages
/login → Login form

/register → Register form

/dashboard → Task list (CRUD, search, filter)

🛠️ Deployment
Deploy on Vercel (recommended) or Netlify.

Add environment variable in hosting platform:

VITE_API_URL=https://your-backend.onrender.com/api
👨‍💻 Author
Tejraj Dewangan


---

✅ This README fits your **Vite + React frontend** setup perfectly.  

👉 Do you also want me to now create the **backend README.md** so you have both repos (frontend + backend) polished for GitHub?