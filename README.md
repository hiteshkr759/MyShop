# MyShop - Node.js E-Commerce Backend

A clean, modular RESTful API for **MyShop** built with Node.js, Express, and ES modules.

---

## 🛡️ Strict AI Guardrails & Restrictions

This repository is equipped with **strict multi-layer AI boundaries** documented in [GEMINI.md](file:///d:/Personal%20Project/MyShop/GEMINI.md), [AGENTS.md](file:///d:/Personal%20Project/MyShop/AGENTS.md), [.agents/rules/safety-restrictions.md](file:///d:/Personal%20Project/MyShop/.agents/rules/safety-restrictions.md), [.cursorrules](file:///d:/Personal%20Project/MyShop/.cursorrules), and [CLAUDE.md](file:///d:/Personal%20Project/MyShop/CLAUDE.md).

### Key Enforced Policies:
1. **Zero-Deletion Policy**:
   - AI assistants are **strictly forbidden** from deleting any files, directories, databases, or git branches.
   - Prohibited commands: `rm`, `del`, `Remove-Item`, `unlink`, `DROP TABLE`, `git clean`, `git reset --hard`.
   - Deprecate, soft-archive, or comment out obsolete assets instead of deleting.
2. **Strict Project Scope**:
   - AI assistants are **strictly restricted** to this directory (`d:\Personal Project\MyShop`).
   - Outside directory traversal, reading other projects, accessing user profile folders, credentials stores, or system configs is strictly prohibited.
3. **No Credential Exposure**:
   - Secrets remain strictly inside `.env` (gitignored). `.env.example` provides safe placeholders.

---

## 📁 Project Architecture

```
MyShop/
├── GEMINI.md                    # Antigravity & Gemini AI Guardrails (Highest priority)
├── AGENTS.md                    # Multi-agent directives
├── CLAUDE.md                    # Claude Code guidelines
├── .cursorrules                 # Cursor AI guidelines
├── .agents/
│   └── rules/
│       └── safety-restrictions.md # Hierarchical safety rules
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot rules
├── src/
│   ├── config/
│   │   └── index.js             # Environment & configuration loader
│   ├── controllers/
│   │   ├── health.controller.js # Health check logic
│   │   ├── category.controller.js # Product categories
│   │   ├── product.controller.js  # Product catalog (CRUD & safe archiving)
│   │   └── order.controller.js    # Order checkout & stock management
│   ├── data/
│   │   └── mockData.js          # Initial seed catalog & sample orders
│   ├── middleware/
│   │   └── errorHandler.js      # Centralized error handler & 404 response
│   ├── routes/
│   │   ├── health.routes.js     # /api/v1/health
│   │   ├── category.routes.js   # /api/v1/categories
│   │   ├── product.routes.js    # /api/v1/products
│   │   ├── order.routes.js      # /api/v1/orders
│   │   └── index.js             # Route aggregator
│   ├── app.js                   # Express app setup & middleware pipeline
│   └── server.js                # Server bootstrap & graceful shutdown
├── tests/
│   └── api.test.js              # Native integration tests
├── .env.example                 # Example environment variables
├── .env                         # Local environment settings
├── .gitignore                   # Git ignore configuration
└── package.json                 # Project manifest & npm scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher; tested on v22+)
- npm (v9 or higher)

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
The `.env` file is pre-configured. You can customize the settings if needed:
```env
PORT=5000
NODE_ENV=development
API_PREFIX=/api/v1
SHOP_NAME=MyShop
DEFAULT_CURRENCY=USD
```

### 4. Running the Server

#### Development Mode (with hot-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

#### Running Tests:
```bash
npm test
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status and root documentation |
| `GET` | `/api/v1/health` | Service health status and uptime |
| `GET` | `/api/v1/categories` | List all product categories |
| `GET` | `/api/v1/categories/:id` | Get details of a single category |
| `GET` | `/api/v1/products` | Browse product catalog (supports query filters) |
| `GET` | `/api/v1/products/:id` | Get single product by ID |
| `POST`| `/api/v1/products` | Create a new product |
| `PUT` | `/api/v1/products/:id` | Update an existing product |
| `PATCH`| `/api/v1/products/:id/archive` | Soft-archive product (safe zero-deletion) |
| `GET` | `/api/v1/orders` | View placed orders |
| `GET` | `/api/v1/orders/:id` | View order by ID |
| `POST`| `/api/v1/orders` | Place a new order with stock validation |

### Query Parameters for `/api/v1/products`:
- `search`: Keyword search matching name, description, or tags (e.g., `?search=keyboard`)
- `categoryId`: Filter by category (e.g., `?categoryId=cat-1`)
- `minPrice` / `maxPrice`: Filter by price range (e.g., `?minPrice=20&maxPrice=100`)

---

## 🧪 Testing

The project uses Node.js's native test runner (`node:test` and `node:assert`). No heavy test frameworks required.
Run the suite anytime:
```bash
npm test
```
