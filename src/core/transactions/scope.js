const validate = require("../../utils/validate");

module.exports = {
    insertTransaction
};

async function insertTransaction(params) {
    const validation = {
        userID: {
            required: true,
            notNull: true,
            number: true,
        },
        accountID: {
            required: true,
            notNull: true,
            number: true,
        },
        categoryID: {
            required: true,
            notNull: true,
            number: true,
        },
        value: {
            required: true,
            notNull: true,
            number: true,
        },
        description: {
            required: true,
            notNull: true,
            string: true,
            notEmpty: true,
            maxlength: 255,
        },
        date: {
            required: true,
            notNull: true,
            date: true,
        },
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}
