const pool = require("../db/connection");

async function createTable() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      );
    `);

        await pool.query(`
      CREATE INDEX idx_updated_id
      ON products(updated_at DESC, id DESC);
    `);

        await pool.query(`
      CREATE INDEX idx_category_updated_id
      ON products(category, updated_at DESC, id DESC);
    `);

        console.log("Products table created successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

createTable();