# Product Browser Backend

A backend application built using Node.js, Express.js, and MySQL that allows users to browse a large product catalog with efficient cursor-based pagination.

## Features

- Browse 200,000 products
- Cursor-based pagination
- Category filtering
- Bulk product seeding
- Simple frontend UI
- MySQL database with indexing

## Tech Stack

- Node.js
- Express.js
- MySQL
- Railway (Database)

## API Endpoints

### Get Products

GET /products

Query Parameters:

- category
- limit
- cursorTime
- cursorId

Example:

```
/products?category=Books&limit=20
```

### Stats

GET /stats

Returns the total number of products.

## Running Locally

```bash
npm install
npm run create-table
npm run seed
npm run dev
```
