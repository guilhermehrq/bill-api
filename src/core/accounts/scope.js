const validate = require("../../utils/validate");

module.exports = {
    createAccount,
    updateAccount,
    getAccounts,
    getAccountByID,
};

async function createAccount(params) {
    const validation = {
        userID: {
            required: true,
            notNull: true,
            number: true,
        },
        title: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
            maxlength: 45,
        },
        initialBalance: {
            required: true,
            notNull: true,
            number: true,
        },
        typeID: {
            required: true,
            notNull: true,
            number: true,
        },
        includeDashboard: {
            required: true,
            notNull: true,
            boolean: true,
        },
        mainAccount: {
            required: true,
            notNull: true,
            boolean: true,
        }
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}

async function updateAccount(params) {
    const validation = {
        userID: {
            required: true,
            notNull: true,
            number: true,
        },
        id: {
            required: true,
            notNull: true,
            number: true,
        },
        title: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
            maxlength: 45,
        },
        actualBalance: {
            required: true,
            notNull: true,
            number: true,
        },
        typeID: {
            required: true,
            notNull: true,
            number: true,
        },
        color: {
            string: true,
        },
        includeDashboard: {
            required: true,
            notNull: true,
            boolean: true,
        },
        mainAccount: {
            required: true,
            notNull: true,
            boolean: true,
        },
        active: {
            required: true,
            notNull: true,
            boolean: true,
        },
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}

async function getAccounts(params) {
    const validation = {
        userID: {
            required: true,
            notNull: true,
            number: true,
        }
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}

async function getAccountByID(params) {
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
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}
