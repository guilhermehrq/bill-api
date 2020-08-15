const { pool } = require("../../config/database");

module.exports = {
    getArticles
};

async function getArticles() {
    return await pool.query(
        `SELECT id,
                title,
                description,
                url,
                img
           FROM articles
          ORDER BY date DESC;`);
}
