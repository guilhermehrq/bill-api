const validate = require("../../utils/validate");

module.exports = {
    insertTransaction,
    getTransactions,
    getTransactionsValue,
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

async function getTransactions(params) {
    const validation = {
        userID: {
            required: true,
            notNull: true,
            number: true,
        },
        accountsID: {
            array: true,
        },
        categoriesID: {
            array: true,
        },
        date: {
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

async function getTransactionsValue(params) {
    const validation = {
        userID: {
            required: true,
            notNull: true,
            number: true,
        },
        date: {
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
