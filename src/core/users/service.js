const { generateToken } = require('../../utils/auth');
const repository = require('./repository');

module.exports = {
    createUser,
    authentication
}

async function createUser(data) {
    const { email, password, name } = data;

    await repository.createUser(email, password, name);

    const user = repository.getUserByEmail(email);

    delete user.password;
    delete user.block_date;

    user.token = generateToken(user);

    return user;
}

async function authentication(data) {
    const { email, password } = data;

    const user = await repository.getUserByEmail(email);

    const isCorrect = await repository.verifyPassword(user.password, password);

    if (!isCorrect) {
        throw {
            statusCode: 401,
            message: 'Invalid password'
        }
    }

    if (user.block_date != null) {
        throw {
            statusCode: 401,
            message: 'Blocked user'
        }
    }

    delete user.password;
    delete user.block_date;

    user.token = generateToken(user);

    return user;
}
