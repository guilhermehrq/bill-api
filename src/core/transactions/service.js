const repository = require("./repository");
const accountsRepository = require("../accounts/repository");
const categoriesRepository = require("../categories/repository");

module.exports = {
    insertTransaction,
    getTransactions,
    getTransactionsValue,
};

async function insertTransaction(params) {
    const account = await accountsRepository.getAccountByID(
        params.accountID,
        params.userID
    );

    if (!account.length) {
        throw {
            statusCode: 404,
            message: "Account not found",
        };
    }

    let category = await categoriesRepository.getCategoryByID(
        params.categoryID
    );

    if (!category.length) {
        throw {
            statusCode: 404,
            message: "Category not found",
        };
    }

    category = category[0];

    if (category.type === "I") {
        params.value = params.value >= 0 ? params.value : params.value * -1;
    } else if (category.type === "E") {
        params.value = params.value <= 0 ? params.value : params.value * -1;
    }

    await repository.insertTransaction(params);

    await accountsRepository.updateAccountBalance(
        params.accountID,
        params.value
    );
}

async function getTransactions(params) {
    const res = await repository.getTransactions(params);

    return res.length > 0 ? res : [];
}

async function getTransactionsValue(userID, date) {
    let res = await repository.getTransactionsValue(userID, "I", date);
    const incomes = +res.rows[0].value;

    res = await repository.getTransactionsValue(userID, "E", date);
    const expenses = +res.rows[0].value;

    const total = incomes - (expenses * -1);

    return {
        incomes,
        expenses,
        total,
    };
}
