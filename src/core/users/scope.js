const validate = require("../../utils/validate");

module.exports = {
    createUser,
    authentication,
};

async function createUser(params) {
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
        },
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}

async function authentication(params) {
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
        },
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}
