const validate = require('../../utils/validate')

module.exports = {
    createUser,
    authentication
}

async function createUser(data) {
    const validation = {
        email: {
            string: true,
            required: true,
            notNull: true,
            notEmpty: true,
            maxLength: 255,
        },
        password: {
            string: true,
            required: true,
            notNull: true,
            notEmpty: true,
            maxLength: 255,
        },
        name: {
            string: true,
            required: true,
            notNull: true,
            notEmpty: true,
            maxLength: 100,
        }
    };

    try {
        await validate(data, validation)
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}

async function authentication(data) {
    const validation = {
        email: {
            string: true,
            required: true,
            notNull: true,
            notEmpty: true,
        },
        password: {
            string: true,
            required: true,
            notNull: true,
            notEmpty: true,
        }
    };

    try {
        await validate(data, validation)
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}
