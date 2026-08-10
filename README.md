# TaskNest — Backend API

The **Express + TypeScript + MongoDB** REST API that powers [TaskNest](https://tasknest-flax.vercel.app). It provides full CRUD endpoints for tasks with search, priority, and status filtering.

> 🌐 **Live App:** [https://tasknest-flax.vercel.app](https://tasknest-flax.vercel.app)
>
> 🔧 **API Base URL (local):** `http://localhost:5000`

---

## ✨ Features

- **Full CRUD** — Create, read, update, and delete tasks.
- **Search** — Filter tasks by `title` / `description` (case-insensitive).
- **Priority filter** — `low` | `medium` | `high`.
- **Status filter** — `todo` | `in_progress` | `completed`.
- **Auto timestamps** — `createdAt` / `updatedAt` handled server-side.
- **Validation** — Invalid / missing IDs return proper `400` errors.
- **CORS enabled** — Ready to accept requests from the frontend.

---

## 🛠 Tech Stack

| Technology   | Purpose                |
| ------------ | ---------------------- |
| **Node.js**  | Runtime                |
| **Express 5** | HTTP framework        |
| **TypeScript** | Type-safe development |
| **MongoDB** | Database (official driver) |
| **dotenv**   | Environment variables  |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- A **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (see `.env` for reference):

```env
PORT=5000
NODE_ENV=development

# MongoDB connection string
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>

# Client application URL (for CORS & auth)
CLIENT_URI=http://localhost:3000
```

### 3. Run the server

```bash
npm run dev
```

The server starts at [http://localhost:5000](http://localhost:5000). You should see:

```
Server listening on http://localhost:5000
```

---

## 📡 API Endpoints

All routes are prefixed with `/api/tasks`.

| Method   | Endpoint       | Description                            | Query Params              |
| -------- | -------------- | -------------------------------------- | ------------------------- |
| `GET`    | `/api/tasks`   | Get all tasks (with filters)           | `search`, `priority`, `status` |
| `GET`    | `/api/tasks/:id` | Get a single task by ID              | —                         |
| `POST`   | `/api/tasks`   | Create a new task                      | —                         |
| `PATCH`  | `/api/tasks/:id` | Update task fields                   | —                         |
| `DELETE` | `/api/tasks/:id` | Delete a task                        | —                         |
| `GET`    | `/`            | Health check ("TaskNest Backend Server Running") | —                 |

### Task Object

```json
{
  "_id": "63f2a1b2c4e5f60000123456",
  "title": "Design system audit",
  "description": "Review all reusable UI components.",
  "priority": "high",
  "status": "in_progress",
  "dueDate": "2026-08-15",
  "createdAt": "2026-07-28T10:00:00.000Z",
  "updatedAt": "2026-07-28T10:00:00.000Z"
}
```

### Example Requests

**Create a task**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Write README",
    "description": "Document the API endpoints.",
    "priority": "medium",
    "status": "todo",
    "dueDate": "2026-08-20"
  }'
```

**Search & filter tasks**

```bash
curl "http://localhost:5000/api/tasks?search=design&priority=high&status=in_progress"
```

**Update a task**

```bash
curl -X PATCH http://localhost:5000/api/tasks/63f2a1b2c4e5f60000123456 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

**Delete a task**

```bash
curl -X DELETE http://localhost:5000/api/tasks/63f2a1b2c4e5f60000123456
```

---

## 📁 Project Structure

```
src/
├── app.ts                 # Express app, CORS, routes, error handler
├── server.ts              # Entry point (starts the server)
├── config/
│   └── db.ts              # MongoDB connection
├── controllers/
│   └── task.controller.ts # Route handlers
├── middleware/
│   └── error.middleware.ts # Global error handler
├── models/
│   └── task.model.ts      # MongoDB collection access
├── routes/
│   └── task.routes.ts     # API route definitions
└── types/
    └── task.types.ts      # Task TypeScript types
```

---

## 📜 Scripts

| Script        | Description                          |
| ------------- | ------------------------------------ |
| `npm run dev` | Start dev server (auto-restart)      |
| `npm run build` | Compile TypeScript to `dist/`      |
| `npm start`   | Run the compiled production server   |

---

## 🤝 Connecting with the Frontend

The frontend ([TaskNest](https://tasknest-flax.vercel.app)) calls this API using the base URL defined in its `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Make sure this backend is running while using the app locally so the frontend can load and manage tasks.
