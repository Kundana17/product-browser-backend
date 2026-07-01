const pool = require("../db/connection");

async function checkCount() {

    const [rows] = await pool.query(
        "SELECT COUNT(*) AS total FROM products"
    );

    console.log(rows);

    process.exit();
}

checkCount();