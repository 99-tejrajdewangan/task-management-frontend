# 📝 Frontend README.md (React.js + React Query)

```markdown
# 🖥️ Task Manager UI (Frontend)

This is the **Next.js (App Router) frontend** for the Task Manager app.  
It provides a clean UI for **register/login and managing tasks**.

---

## 🚀 Tech Stack
- React.js
- React Query (TanStack) for data fetching
- Axios for API calls
- TailwindCSS for styling
- Context API for auth state

---

## 📂 Project Structure
frontend/
├── app/
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ ├── login/page.tsx
│ ├── register/page.tsx
│ ├── dashboard/page.tsx
│ └── tasks/
│ ├── new/page.tsx
│ └── [id]/page.tsx
├── components/
│ ├── Navbar.tsx
│ └── TaskForm.tsx
├── context/AuthContext.tsx
├── lib/axios.ts
├── package.json
└── .env.local.example

---

## 🔧 Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
2. Install dependencies
bash
Copy code
npm install
3. Configure environment variables
Create .env.local file from .env.local.example:

bash
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000/api
👉 Change this URL to your deployed backend when hosting (e.g. https://your-api.onrender.com/api).

4. Run frontend
bash
Copy code
npm run dev
Frontend runs on → http://localhost:3000

🔗 Pages
/login → Login page

/register → Register page

/dashboard → Task dashboard (list + search + filter)

/tasks/new → Create task

/tasks/[id] → Edit task

yaml
Copy code

---

✅ With these two **separate repos + READMEs**, you can push:

- `task-manager-backend` → GitHub → deploy to Render  
- `task-manager-frontend` → GitHub → deploy to Vercel  

---

👉 Do you want me to also give you the **`.env.example` contents** for both repos so that they’re copy-paste ready for your GitHub push?