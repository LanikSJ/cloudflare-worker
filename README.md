# Security.txt Cloudflare Worker

[![Test Cloudflare Worker](https://github.com/LanikSJ/cloudflare-worker/actions/workflows/deploy-test.yml/badge.svg)](https://github.com/LanikSJ/cloudflare-worker/actions/workflows/deploy-test.yml)
[![Deploy Cloudflare Worker](https://github.com/LanikSJ/cloudflare-worker/actions/workflows/cloudflare-deploy.yml/badge.svg)](https://github.com/LanikSJ/cloudflare-worker/actions/workflows/cloudflare-deploy.yml)

A [Cloudflare Worker](https://workers.cloudflare.com/) that serves an
[RFC 9116](https://datatracker.ietf.org/doc/html/rfc9116)-compliant
`security.txt` file for Lanik.us domains.

## 📑 Table of Contents

- [✨ Overview](#-overview)
- [🌐 Domains](#-domains)
- [⚡ Features](#-features)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Getting Started](#-getting-started)
  - [📦 Install Dependencies](#-install-dependencies)
  - [💻 Local Development](#-local-development)
  - [🔧 Type Generation](#-type-generation)
  - [🧪 Run Tests](#-run-tests)
- [🌍 Deployment](#-deployment)
- [📁 Project Structure](#-project-structure)
- [⚙️ Configuration](#️-configuration)
- [📄 License](#-license)
- [🛡️ Security](#️-security)

## ✨ Overview

This worker intercepts requests to `/.well-known/security.txt` and
`/security.txt` on configured Lanik.us domains and returns a dynamically
generated `security.txt` file containing security contact information,
canonical URLs, and the vulnerability disclosure policy link.

All other requests pass through to the origin unmodified.

## 🌐 Domains

The worker serves security.txt files for the following domains:

- `lanik.us`
- `forum.lanik.us`

## ⚡ Features

- RFC 9116-compliant `security.txt` response
- Dynamic `Expires` header (updated automatically with a 1-year validity)
- Proper `Content-Type` and `Cache-Control` headers
- Pass-through proxy for all non-security.txt requests
- Deployed globally on Cloudflare's edge network

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)
- [Cloudflare account](https://dash.cloudflare.com/) with Workers enabled
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
  (included as a dev dependency)

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

### 💻 Local Development

Start the local development server with Wrangler:

```bash
npm run dev
```

This starts a dev server on `http://localhost:8787`. You can test
locally by visiting:

```text
http://localhost:8787/.well-known/security.txt
http://localhost:8787/security.txt
```

### 🔧 Type Generation

Generate updated TypeScript types for the worker environment:

```bash
npm run cf-typegen
```

### 🧪 Run Tests

```bash
npm test
```

## 🌍 Deployment

Deploy the worker to Cloudflare's global network:

```bash
npm run deploy
```

This requires authentication with your Cloudflare account via `wrangler login`
or a `CLOUDFLARE_API_TOKEN` environment variable.

## 📁 Project Structure

```text
cloudflare-worker/
├── src/
│   └── index.ts              # Worker entry point
├── .editorconfig             # Editor configuration
├── .gitignore                # Git ignore rules
├── .markdownlint.json        # Markdown linting config
├── .prettierrc               # Prettier formatting rules
├── AGENTS.md                 # Agent and project standards
├── LICENSE                   # License file
├── README.md                 # This file
├── SECURITY.md               # Security policy
├── package.json              # Project manifest and scripts
├── tsconfig.json             # TypeScript configuration
├── vitest.config.mts         # Vitest test configuration
├── worker-configuration.d.ts # Auto-generated worker types
└── wrangler.jsonc            # Wrangler deployment config
```

## ⚙️ Configuration

The `wrangler.jsonc` file defines the worker name, routes, and
compatibility settings. Routes are configured for both
`/.well-known/security.txt` and `/security.txt` paths on the
configured domains.

## 📄 License

This project is licensed under the terms found in the [LICENSE](./LICENSE)
file.

## 🛡️ Security

To report a security vulnerability, please see
[SECURITY.md](./SECURITY.md) for instructions on responsible disclosure.
