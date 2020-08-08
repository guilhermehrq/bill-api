const validate = require("../../utils/validate");

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    getCategoryByID,
}

async function createCategory(params) {
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
            maxlength: 255,
        },
        type: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
            maxlength: 1,
        },
        color: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
        },
        icon: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
        },
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}

async function getCategories(params) {
    const validation = {
        userID: {
            required: true,
            notNull: true,
            number: true,
        },
        title: {
            string: true,
            maxlength: 255,
        },
        type: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
            maxlength: 1,
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

async function getCategoryByID(params) {
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
        }
    };

    try {
        await validate(params, validation);
    } catch (e) {
        e.statusCode = 400;
        throw e;
    }
}

async function updateCategory(params) {
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
            maxlength: 255,
        },
        color: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
        },
        icon: {
            required: true,
            notNull: true,
            notEmpty: true,
            string: true,
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
