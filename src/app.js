const express = require("express");
const pool = require("./db/connection");
const productsRoute = require("./routes/products");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/products", productsRoute);
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS test");

        res.json({
            success: true,
            message: "Database Connected",
            data: rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});