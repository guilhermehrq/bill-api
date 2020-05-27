const { pool } = require('../../config/database')

module.exports = {
    createUser,
    getUserByEmail,
    verifyPassword,
}

async function createUser(email, password, name) {
    const res = await pool.query(`SELECT *
                                     FROM users
                                    WHERE email = $1`, [ email ]);

    if (res.rows.length) {
        throw {
            statusCode: 401,
            message: 'E-mail already exists'
        }
    }

    await pool.query(`INSERT INTO users(email, password, name, register_date)
                        VALUES($1, md5($2), $3, now());`, [ email, password, name ]);
}

async function getUserByEmail(email) {
    let res = await pool.query(`SELECT id, email, password, name, url_img, block_date
                                     FROM users
                                    WHERE email = $1`, [ email ]);

    if (!res.rows.length) {
        throw {
            statusCode: 404,
            message: 'User not found'
        }
    }

    return res.rows[0];
}

async function verifyPassword(userPassword, entryPassword) {
    const res = await pool.query(`SELECT $1 = md5($2) as "isCorrect"`, [ userPassword, entryPassword ]);

    return res.rows[0].isCorrect;
}
