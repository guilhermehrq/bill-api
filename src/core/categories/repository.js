const { pool } = require("../../config/database");

module.exports = {
    createCategory,
    getCategories,
    getCategoryByID,
    updateCategory,
};

async function createCategory(params) {
    const { userID, title, type, color, icon } = params;

    return await pool.query(
        `INSERT INTO categories (user_id, title, type, color, icon)
                                  VALUES ($1, $2, $3, $4, $5)`,
        [userID, title, type, color, icon]
    );
}

async function getCategories(params) {
    const { userID, title, type, active } = params;

    const filters = [];

    if (title != null) {
        filters.push(`AND title = '${title}'`);
    }

    const res = await pool.query(
        `SELECT id,
                title,
                type,
                color,
                icon
           FROM categories
          WHERE user_id = $1
            AND type    = $2
            AND active  = $3
            ${filters.join()}
          ORDER BY title`,
        [userID, type, active]
    );

    return res.rows;
}

async function getCategoryByID(categoryID) {
    const res = await pool.query(
        `SELECT id,
                title,
                type,
                color,
                icon
           FROM categories
          WHERE id = $1`,
        [categoryID]
    );

    return res.rows;
}

async function updateCategory(params) {
    const { id, title, color, icon, active } = params;

    return await pool.query(
        `UPDATE categories
            SET title  = $1,
                color  = $2,
                icon   = $3,
                active = $4
          WHERE id = $5`,
        [title, color, icon, active, id]
    );
}
