# Express Products API - Starter

This is a small starter Express.js REST API for the Week 2 assignment (products resource).
It includes routes, controllers, middleware (auth, validation, error handling), and examples.

## How to use

1. Unzip the starter, or copy files into your repository root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set values:
   ```
   PORT=5000
   API_KEY=mysecretkey
   ```
4. Run:
   ```bash
   npm start
   # or for dev:
   npm run dev
   ```

## API Endpoints

- GET  /api/products
- GET  /api/products/:id
- POST /api/products      (requires header `x-api-key`)
- PUT  /api/products/:id  (requires header `x-api-key`)
- DELETE /api/products/:id (requires header `x-api-key`)

### Examples

Get all products:
```bash
curl http://localhost:5000/api/products
```

Create a product:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: mysecretkey" \
  -d '{ "name": "Headphones", "price": 100 }'
```

Expected responses are simple JSON objects (see code files for examples).

## Notes for beginners

- This project uses an in-memory array to store products (no DB). Data resets when the server restarts.
- Keep your real credentials out of the repo; use `.env` (which is in .gitignore).
