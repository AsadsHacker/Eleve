# ÉLEVÉ Luxury Restaurant Web App

A premium, 11-page React clone of the Restoria Restaurant template, rebranded as a luxury dining experience in Clifton, Karachi. Built with pixel-perfect attention to detail, modern aesthetics, and smooth animations.

---

## 📂 Project Architecture

The project has been organized into a professional, clean MERN workspace structure:

```
├── api/                  # Vercel Serverless Function entrypoint
│   └── index.js
├── backend/              # Node.js + Express backend workspace
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express route handlers
│   ├── index.js          # Express local server setup
│   ├── package.json
│   └── .env
├── frontend/             # React + Vite frontend workspace
│   ├── src/              # React components, context, and pages
│   ├── public/           # Static assets
│   ├── index.html
│   ├── vite.config.js    # Compiles build out to root `/dist`
│   ├── package.json
│   └── .env
├── dist/                 # Compiled frontend output (auto-generated)
├── vercel.json           # Unified Vercel serverless routing
├── package.json          # Root workspace configuration
└── README.md
```

---

## 🛠️ Tech Stack
*   **Frontend:** React 19 + Vite + Tailwind CSS 4 (Glassmorphism, dark mode base)
*   **Backend:** Express + Mongoose + Cors + Dotenv
*   **Database:** MongoDB Atlas
*   **Animations:** Framer Motion (Scroll reveals, hovers)
*   **Routing:** React Router DOM
*   **Forms:** React Hook Form + Zod validation
*   **Icons:** Lucide React

---

## 💻 Local Development

This project uses **npm workspaces** to make managing both the frontend and backend simple and unified.

### Prerequisites
Make sure you have Node.js (version 18+) installed.

### 1. Installation
Run the following command at the **root directory** to install dependencies for both frontend and backend workspaces:
```bash
npm install
```

### 2. Configuration
Ensure you have the environment variables set up:
- **Backend (`/backend/.env`):**
  ```env
  MONGO_URI=your_mongodb_connection_uri
  PORT=5000
  ```
- **Frontend (`/frontend/.env`):**
  ```env
  VITE_API_URL=http://localhost:5000
  ```

### 3. Running the App
You can run both the frontend and local server concurrently with a single command from the **root directory**:
```bash
npm run dev
```
*   **Frontend:** Runs at `http://localhost:5173`
*   **Backend Server:** Runs at `http://localhost:5000`

Or run them individually if preferred:
*   Frontend only: `npm run dev:frontend`
*   Backend only: `npm run dev:backend`

---

## 🚀 Vercel Deployment Instructions

This project is configured out-of-the-box for seamless deployment on Vercel as a single monorepo.

1. Push this repository to **GitHub**.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect the settings. Keep them default:
   * **Framework Preset:** Vite
   * **Root Directory:** `./` (Leave as project root)
   * **Build Command:** `npm run build` (This runs the build inside the frontend workspace and outputs to `/dist` at the root)
   * **Output Directory:** `dist`
5. Click **Deploy**. Vercel will build the frontend, deploy the serverless backend functions from `/api`, and host your live production site!
