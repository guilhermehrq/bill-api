const { pool } = require("../../config/database");

module.exports = {
    createUser,
    getUserByEmail,
    verifyPassword,
};

async function createUser(email, password, name) {
    const res = await pool.query(
        `SELECT *
           FROM users
          WHERE email = $1`,
        [email]
    );

    if (res.rows.length) {
        throw {
            statusCode: 401,
            message: "E-mail already exists",
        };
    }

    await pool.query(
        `INSERT INTO users(email, password, name, created_at)
              VALUES($1, md5($2), $3, now());`,
        [email, password, name]
    );

    await insertStandardCategories(email);
}

async function insertStandardCategories(userEmail) {
    const user = await getUserByEmail(userEmail);
    const { id } = user;

    await pool.query(
        `INSERT INTO categories (user_id, title, type, color, icon)
              VALUES ($1, 'Salário', 'I', '#1E88E5', 'local_atm'),
                     ($1, 'Investimentos', 'I', '#43A047', 'trending_up'),
                     ($1, 'Presente', 'I', '#6D4C41', 'card_giftcard'),
                     ($1, 'Prêmios', 'I', '#3949AB', 'emoji_events'),
                     ($1, 'Outros', 'I', '#546E7A', 'more_horiz'),
                     ($1, 'Educação', 'E', '#546E7A', 'menu_book'),
                     ($1, 'Contas', 'E', '#E53935', 'attach_money'),
                     ($1, 'Comida e bebida', 'E', '#1E88E5', 'restaurant'),
                     ($1, 'Casa', 'E', '#5E35B1', 'home'),
                     ($1, 'Transporte', 'E', '#00897B', 'directions_car'),
                     ($1, 'Compras', 'E', '#D81B60', 'local_mall'),
                     ($1, 'Transferência Entrada', 'T', '#43A047', 'swap_vert'),
                     ($1, 'Transferência Saída', 'T', '#E53935', 'swap_vert');`,
        [id]
    );
}

async function getUserByEmail(email) {
    let res = await pool.query(
        `SELECT id,
                email,
                password,
                name,
                url_img    as "urlImg",
                block_date as "blockDate"
           FROM users
          WHERE email = $1`,
        [email]
    );

    if (!res.rows.length) {
        throw {
            statusCode: 404,
            message: "User not found",
        };
    }

    return res.rows[0];
}

async function verifyPassword(userPassword, entryPassword) {
    const res = await pool.query(`SELECT $1 = md5($2) as "isCorrect"`, [
        userPassword,
        entryPassword,
    ]);

    return res.rows[0].isCorrect;
}
