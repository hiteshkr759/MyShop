> 🔒 **Locked to Google Antigravity** - This codebase was built and is maintained exclusively with Antigravity. No other AI assistant is authorized.

# MyShop - Fastify & Prisma E-Commerce Backend

A high-performance, modular RESTful API for **MyShop** built with **Fastify**, **Prisma ORM**, **pnpm**, and **PM2**, organized with a **feature-wise folder structure** and a centralized **bootstrap** module for shared integration resources.

---

## 🛡️ Strict AI Guardrails & Restrictions

This repository is locked to Google Antigravity with multi-layer boundaries documented in [ANTIGRAVITY.LOCK](file:///d:/Personal%20Project/MyShop/ANTIGRAVITY.LOCK), [AGENT.md](file:///d:/Personal%20Project/MyShop/AGENT.md), [GEMINI.md](file:///d:/Personal%20Project/MyShop/GEMINI.md), and [scripts/enforce-antigravity-lock.js](file:///d:/Personal%20Project/MyShop/scripts/enforce-antigravity-lock.js).

### Key Enforced Policies:
1. **Zero-Deletion Policy**:
   - AI assistants are **strictly forbidden** from deleting any files, directories, databases, or git branches.
   - Prohibited commands: `rm`, `del`, `Remove-Item`, `unlink`, `DROP TABLE`, `git clean`, `git reset --hard`.
   - Deprecate, soft-archive (`deletedAt`), or comment out obsolete assets instead of deleting.
2. **Strict Project Scope**:
   - Operations are strictly restricted to `d:\Personal Project\MyShop`.
   - Outside directory traversal and system modifications are forbidden.
3. **No Credential Exposure**:
   - Secrets remain strictly inside `.env` (gitignored). `.env.example` provides safe placeholders.

---

## 📁 Architecture & Feature-Wise Directory Structure

```
MyShop/
├── ANTIGRAVITY.LOCK             # Exclusivity lock definition
├── AGENT.md / AGENTS.md         # Antigravity operational directives
├── GEMINI.md                    # Primary workspace rules
├── ecosystem.config.cjs         # PM2 process manager configuration
├── prisma/
│   └── schema.prisma            # Prisma data models (Category, Product, Order, OrderItem)
├── src/
│   ├── bootstrap/               # Central loader initializing shared resources
│   │   ├── index.js             # Master bootstrap loading database, plugins, routes, lifecycle
│   │   ├── database.js          # Shared Prisma client integration & disconnect hooks
│   │   ├── plugins.js           # Fastify plugins (CORS, Helmet, Sensible, DB decoration)
│   │   ├── routes.js            # Feature route aggregator mounted under /api/v1
│   │   └── lifecycle.js         # Graceful shutdown signals & structured error handler
│   ├── features/                # Feature-wise modular components
│   │   ├── health/              # Health check feature
│   │   │   ├── health.controller.js
│   │   │   ├── health.routes.js
│   │   │   └── health.schema.js
│   │   ├── categories/          # Categories feature
│   │   │   ├── category.controller.js
│   │   │   ├── category.service.js
│   │   │   ├── category.routes.js
│   │   │   └── category.schema.js
│   │   ├── products/            # Products feature
│   │   │   ├── product.controller.js
│   │   │   ├── product.service.js
│   │   │   ├── product.routes.js
│   │   │   └── product.schema.js
│   │   └── orders/              # Orders & checkout feature
│   │       ├── order.controller.js
│   │       ├── order.service.js
│   │       ├── order.routes.js
│   │       └── order.schema.js
│   ├── config/
│   │   └── index.js             # Environment variables configuration
│   ├── data/
│   │   └── mockData.js          # Initial catalog seed data
│   ├── app.js                   # Application factory invoking bootstrap
│   └── server.js                # Server entry point
├── tests/
│   └── api.test.js              # Integration tests using Fastify app.inject()
├── .env / .env.example          # Environment settings
├── .gitignore                   # Git ignore rules
├── package.json                 # Project manifest & npm scripts
└── pnpm-lock.yaml               # pnpm dependency lockfile
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher; tested on Node v22)
- pnpm (v9 or higher; tested on pnpm v12)

### 2. Installation
```bash
pnpm install
```

### 3. Database Setup (Prisma)
Generate the Prisma Client and push the schema to SQLite (`dev.db`):
```bash
pnpm prisma:generate
pnpm prisma:push
```

### 4. Running the Application

#### Development Mode (with Nodemon):
```bash
pnpm dev
```

#### Production Mode (with PM2):
```bash
# Start via PM2
pnpm pm2:start

# Check PM2 status
pnpm pm2:status

# View PM2 logs
pnpm pm2:logs

# Stop PM2
pnpm pm2:stop
```

#### Running Tests:
```bash
pnpm test
```

#### Running Linter:
```bash
pnpm lint
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and root documentation |
| `GET` | `/api/v1/health` | Service health status and uptime |
| `GET` | `/api/v1/categories` | List all product categories |
| `GET` | `/api/v1/categories/:id` | Get details of a single category |
| `POST`| `/api/v1/categories` | Create a new category |
| `GET` | `/api/v1/products` | Browse product catalog (supports search and price filters) |
| `GET` | `/api/v1/products/:id` | Get single product by ID |
| `POST`| `/api/v1/products` | Create a new product in Prisma DB |
| `PUT` | `/api/v1/products/:id` | Update product details |
| `PATCH`| `/api/v1/products/:id/archive` | Soft-archive product (Zero-Deletion directive) |
| `GET` | `/api/v1/orders` | View placed orders with line items |
| `GET` | `/api/v1/orders/:id` | View order by ID |
| `POST`| `/api/v1/orders` | Place an order with atomic stock validation & deduction |

---

## 🔒 Fastify & Prisma Security Features
- **JSON Schema Validation**: Every route validates parameters, querystrings, and payloads via Fastify schemas.
- **Sensitive Data Redaction**: Pino automatically redacts authorization headers, cookies, passwords, and payment information from logs.
- **Atomic Transactions**: Orders utilize `prisma.$transaction` to guarantee stock integrity and prevent race conditions.
- **Lifecycle Cleanliness**: Database connections disconnect cleanly via Fastify's `onClose` hook on process termination.
