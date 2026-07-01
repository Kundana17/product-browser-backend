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

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

async function seedProducts() {
    try {
        console.log("Starting seeding...");

        for (let start = 0; start < TOTAL_PRODUCTS; start += BATCH_SIZE) {

            const values = [];

            for (let i = 0; i < BATCH_SIZE; i++) {

                const createdAt = faker.date.past();
                const updatedAt = faker.date.between({
                    from: createdAt,
                    to: new Date()
                });

                values.push([
                    faker.commerce.productName(),
                    categories[Math.floor(Math.random() * categories.length)],
                    faker.commerce.price(),
                    createdAt,
                    updatedAt
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

            console.log(
                `Inserted ${Math.min(start + BATCH_SIZE, TOTAL_PRODUCTS)} products`
            );
        }

        console.log("Finished seeding 200000 products");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedProducts();