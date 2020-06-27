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
              VALUES ($1, 'Salário', 'I', '0xFF1E88E5', '58686'),
                     ($1, 'Investimentos', 'I', '0xFF43A047', '59621'),
                     ($1, 'Presente', 'I', '0xFF6D4C41', '59638'),
                     ($1, 'Prêmios', 'I', '0xFF3949AB', '59448'),
                     ($1, 'Outros', 'I', '0xFF546E7A', '58835'),
                     ($1, 'Educação', 'E', '0xFF546E7A', '59404'),
                     ($1, 'Contas', 'E', '0xFFE53935', '57895'),
                     ($1, 'Comida e bebida', 'E', '0xFF1E88E5', '58732'),
                     ($1, 'Casa', 'E', '0xFF5E35B1', '59530'),
                     ($1, 'Transporte', 'E', '0xFF00897B', '58673'),
                     ($1, 'Compras', 'E', '0xFFD81B60', '58700'),
                     ($1, 'Transferência Entrada', 'T', '0xFF43A047', '59605'),
                     ($1, 'Transferência Saída', 'T', '0xFFE53935', '59605');`,
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
