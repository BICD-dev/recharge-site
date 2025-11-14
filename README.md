⚡ Datafy – Data, Airtime & Utility Payment Platform

A full-stack web application that enables users to recharge airtime, buy data plans, and pay for utility bills seamlessly.
Built with React + TypeScript on the frontend and Node.js + Express + PostgreSQL on the backend.

🚀 Features

💳 Airtime & Data Recharge – Buy airtime or mobile data for all major networks.

🧾 Utility Bill Payments – Pay for electricity, cable TV, and other services.

👤 User Authentication – Secure signup/login using JWT.

💼 Transaction History – Track past purchases and payments.

📊 Wallet System – Add funds and make payments directly from your wallet.

🔐 Role-Based Access Control – Admins can manage users and monitor transactions.

⚡ Real-Time Updates – Instant transaction feedback via toast notifications.

📱 Responsive Design – Works perfectly on mobile and desktop devices.

🧩 Tech Stack
Frontend

⚛️ React

💙 TypeScript

🎨 Tailwind CSS

⚡ Vite

🔔 Sonner (notifications)

🧭 React Router DOM

📦 Axios

Backend

🟢 Node.js

🚀 Express.js

🗃️ PostgreSQL (with Prisma or Sequelize ORM)

🔐 JSON Web Token (JWT) for authentication

🧰 Bcrypt for password hashing

🧾 Nodemailer (optional for email notifications)

🏗️ Architecture Overview
Frontend (React + TypeScript)
       ↓ Axios API Calls
Backend (Node + Express)
       ↓ ORM (Prisma/Sequelize)
Database (PostgreSQL)


The frontend consumes REST APIs provided by the backend. The backend manages authentication, transactions, and integration with external APIs for telecom and utility services.

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

2. Setup Backend
cd backend
npm install

Create a .env file
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/Datafy
JWT_SECRET=your_jwt_secret
NODE_ENV=development

Run database migrations (if using Prisma)
npx prisma migrate dev

Start backend
npm run dev


Backend should now run on:
📍 http://localhost:5000

3. Setup Frontend
cd frontend
npm install

Create a .env file
VITE_API_URL=http://localhost:5000

Start frontend
npm run dev


Frontend should now run on:
📍 http://localhost:5173

🧪 API Endpoints (Examples)
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/user/profile	Get logged-in user details
POST	/api/transactions/airtime	Recharge airtime
POST	/api/transactions/data	Purchase data plan
POST	/api/transactions/utilities	Pay utility bills
GET	/api/transactions	Get user’s transaction history
🛡️ Authentication

JWT-based authentication is used for all protected routes.
The frontend stores tokens securely (e.g., in httpOnly cookies or memory) and includes them in API requests.

📦 Folder Structure
root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.tsx
│   └── ...
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   └── ...
└── README.md

🧰 Scripts
Frontend
Command	Description
npm run dev	Start dev server
npm run build	Build production app
npm run preview	Preview production build
Backend
Command	Description
npm run dev	Start development server
npm run start	Run production server
🧑‍💻 Author

Iheagwam Bright Chinedum
Frontend Engineer | Full-Stack Developer
📧 iheagwambc@gmail.com

🌐 GitHub – BICD-dev

🏁 License

This project is licensed under the MIT License.
Feel free to fork, modify, and use it as needed.

🌟 Acknowledgements

React, Node.js & PostgreSQL Communities

Open-source API providers for telecom and utility integration

Vercel & Render for deployment