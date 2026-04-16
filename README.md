# Professional ERP System

A full-stack Enterprise Resource Planning system built with React, Node.js, Express, and MongoDB.

## Features

- **Dashboard** — Real-time KPIs, charts, and activity feed
- **Inventory Management** — Products, stock levels, warehouses, categories
- **Sales** — Orders, invoices, customers, quotations
- **Purchases** — Purchase orders, suppliers, receiving
- **HR** — Employees, departments, attendance, payroll
- **Finance** — Chart of accounts, journal entries, reports
- **Settings** — Company profile, users, roles & permissions

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, Ant Design |
| Backend  | Node.js, Express.js               |
| Database | MongoDB with Mongoose              |
| Auth     | JWT (access + refresh tokens)      |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 6+ (local or Atlas)

### Backend

```bash
cd backend
cp .env.example .env   # edit with your MongoDB URI & JWT secret
npm install
npm run dev
```

Runs on http://localhost:5000

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Runs on http://localhost:5173


(Created automatically on first run via the seed script)

## Project Structure

```
erp-system/
├── backend/
│   ├── config/         # DB connection, env config
│   ├── controllers/    # Route handlers
│   ├── middleware/      # Auth, error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── contexts/   # Auth & App context
│   │   ├── hooks/      # Custom hooks
│   │   ├── layouts/    # App layout with sidebar
│   │   ├── pages/      # Route pages
│   │   ├── services/   # API service layer
│   │   └── utils/      # Helpers, constants
│   └── ...
└── README.md
```

## License

MIT
