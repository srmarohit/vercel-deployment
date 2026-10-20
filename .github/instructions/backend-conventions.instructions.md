---
description: "Use when writing or modifying JavaScript code in this Express + Mongoose backend. Covers CommonJS module style, folder structure, async error handling, JSON API response conventions, and environment/secret config."
applyTo: "**/*.js"
---

# Express Backend Conventions

## Code Style & Structure

- Prefer CommonJS modules (`require` / `module.exports`); avoid ESM `import`/`export`.
- Keep the existing folder layout: Mongoose models in `model/`, Express routers in `router/`, app wiring in `index.js`.
- Define routes with `express.Router()` and mount them in `index.js` via `app.use()`.

## Error Handling & Async Patterns

- Prefer wrapping async route handlers in try/catch and responding with an appropriate HTTP status code on failure.
- Use guard clauses with early returns for error cases.
- Avoid unreachable code, e.g. statements after `return res...`.

## API & Response Conventions

- Prefer `res.status(...).json({ ... })` over `res.send()` for API responses.
- Use consistent status codes: 200 for reads, 201 for creates, 4xx for client errors, 500 for server errors.
- Standardize error responses as `res.status(...).json({ error: "message" })`.
- Prefer REST route conventions for new code: `GET /orders`, `POST /orders`, `GET /orders/:id`, using plural nouns and HTTP verbs instead of verb-in-path names like `/getorders` or `/createorder`.

## Security & Config

- Read configuration from `process.env` via dotenv (e.g. `PORT`, `MONGODB_URI`); avoid hardcoding secrets or connection strings.
- Never commit `.env`; keep it listed in `.gitignore`.
- Prefer validating `req.body` and `req.params` before using them in Mongoose queries.
