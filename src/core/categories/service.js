const repository = require('./repository');

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    getCategoryByID,
}

async function createCategory(params) {
    const res = await repository.getCategories(params);

    if (res.length) {
        throw {
            statusCode: 400,
            message: "This category already exists",
        };
    }

    await repository.createCategory(params);
}

async function getCategories(params) {
    const res = await repository.getCategories(params);

    return res.length > 0 ? res : [];
}

async function getCategoryByID(params) {
    const res = await repository.getCategoryByID(params.id, params.userID);

    if (!res.length) {
        throw {
            statusCode: 404,
            message: "Category not found",
        };
    }

    return res[0];
}

async function updateCategory(params) {
    const res = await repository.getCategoryByID(params.id, params.userID);

    if (!res.length) {
        throw {
            statusCode: 404,
            message: "Category not found",
        };
    }

    await repository.updateCategory(params);
}
