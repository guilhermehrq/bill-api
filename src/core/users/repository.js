const { pool } = require('../../config/database')

module.exports = {
    createUser,
    authentication
}

async function createUser(data) {
    const { email, password, name } = data;

    const user = await pool.query(`SELECT *
                                     FROM users
                                    WHERE email = $1`, [ email ]);

    if (user.rows.length) {
        throw {
            statusCode: 401,
            message: 'E-mail already exists'
        }
    }

    const newUser = await pool.query(`INSERT INTO users(email, password, name, register_date)
                        VALUES($1, md5($2), $3, now());`, [ email, password, name ]);

    console.log(newUser);
}

async function authentication(data) {
    const { email, password } = data;

    let user = await pool.query(`SELECT id, email, password, name, url_img, block_date
                                     FROM users
                                    WHERE email = $1`, [ email ]);

    if (!user.rows.length) {
        throw {
            statusCode: 404,
            message: 'User not found'
        }
    }

    user = user.rows[0];

    const userPassword = await pool.query(`SELECT $1 = md5($2) as isCorrect`, [ user.password, password ]);

    console.log(userPassword)

    if (!userPassword.rows[0].iscorrect) {
        throw {
            statusCode: 401,
            message: 'Invalid password'
        }
    }

    if (user['block_date'] != null) {
        throw {
            statusCode: 401,
            message: 'Blocked user'
        }
    }

    delete user.password;
    delete user['block_date'];

    return user;
}
