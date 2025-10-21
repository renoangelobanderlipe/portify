# Portify 🚀

![Node.js](https://img.shields.io/badge/Node.js-v20+-green?style=flat-square)
![pnpm](https://img.shields.io/badge/pnpm-v8+-blue?style=flat-square)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

> ⚠️ **Notice:** This repository is proprietary. You may **not duplicate, redistribute, or use this code for commercial purposes** without explicit permission from the author.

**Portify** is a full-stack portfolio management system designed for developers and creators who want complete control over their portfolio content.

It features:

- A **secure Laravel + Sanctum backend** for authentication and API key management.
- A sleek **Next.js + ShadCN admin panel** for managing projects, images, tech stacks, and links.
- An easy way to keep personal or team portfolios in sync — whether it’s one project or hundreds.

---

## 🔧 Tech Stack

**Backend:**

- Laravel
- Laravel Sanctum (cookie-based auth for admin, bearer token for API access)

**Frontend:**

- Next.js 15 (App Router)
- TypeScript
- ShadCN UI
- Tailwind CSS
- Zustand
- Zod
- React Hook Form
- TanStack Query
- uidotdev hooks

---

## ⚙️ Prerequisites

Make sure you have the following installed:

1. **Node.js** (v20+)
2. **pnpm** (v8+)

---

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/renoangelobanderlipe/portify.git

```

### 2. Install dependencies

```bash
cd portify
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

### 📝 Additional Notes & Best Practices

#### 1. Code Formatting

Before committing, make sure your code is formatted:

```bash
pnpm lint:format
```

#### 2. Branching Strategy

Always create a new branch for your feature or fix:

```bash
git checkout -b <yourname>/<feature-name>
eg. git checkout -b reno/fix-login-form
```

#### 3. Merging Guidelines

- Wait for the pipeline to finish before merging.

- Always squash commits for cleaner history.
