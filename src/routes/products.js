const express = require("express");
const pool = require("../db/connection");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const limit = Math.min(
            parseInt(req.query.limit) || 20,
            100
        );
        const category = req.query.category;

        const cursorTime = req.query.cursorTime;
        const cursorId = req.query.cursorId;

        let query = `
      SELECT *
      FROM products
    `;

        let conditions = [];
        let values = [];

        if (category) {
            conditions.push("category = ?");
            values.push(category);
        }

        if (cursorTime && cursorId) {
            conditions.push(`
        (
          updated_at < ?
          OR
          (
            updated_at = ?
            AND id < ?
          )
        )
      `);

            values.push(cursorTime);
            values.push(cursorTime);
            values.push(cursorId);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += `
      ORDER BY updated_at DESC, id DESC
      LIMIT ?
    `;

        values.push(limit);

        const [rows] = await pool.query(query, values);

        let nextCursor = null;

        if (rows.length > 0) {
            const last = rows[rows.length - 1];

            nextCursor = {
                updated_at: last.updated_at,
                id: last.id
            };
        }

        res.json({
            count: rows.length,
            nextCursor,
            products: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;