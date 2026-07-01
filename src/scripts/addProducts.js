const pool = require("../db/connection");
const { faker } = require("@faker-js/faker");

const categories = [
    "Electronics",
    "Books",
    "Fashion",
    "Sports",
    "Home",
    "Beauty",
    "Toys",
    "Food"
];

async function addProducts() {
    try {

        const values = [];

        for (let i = 0; i < 50; i++) {

            const now = new Date();

            values.push([
                faker.commerce.productName(),
                categories[Math.floor(Math.random() * categories.length)],
                faker.commerce.price(),
                now,
                now
            ]);
        }

        await pool.query(
            `
      INSERT INTO products
      (name, category, price, created_at, updated_at)
      VALUES ?
      `,
            [values]
        );

        console.log("50 products added successfully");

        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

addProducts();