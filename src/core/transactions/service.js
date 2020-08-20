const repository = require("./repository");
const accountsRepository = require("../accounts/repository");
const categoriesRepository = require("../categories/repository");

module.exports = {
    insertTransaction,
    getTransactions,
    getTransactionsValue,
    insertTransference,
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
        params.categoryID,
        params.userID
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

async function insertTransference(params) {
    const accountFrom = await accountsRepository.getAccountByID(
        params.accountFrom,
        params.userID
    );

    const accountTo = await accountsRepository.getAccountByID(
        params.accountTo,
        params.userID
    );

    if (!accountFrom.length || !accountTo.length) {
        throw {
            statusCode: 404,
            message: "Account not found",
        };
    }

    const transferenceCategories = await categoriesRepository.getCategories({ userID: params.userID, type: 'T', active: true });

    const transactionFrom = {
        accountID: params.accountFrom,
        categoryID: transferenceCategories.filter(item => item.title === 'Transferência Saída')[0].id,
        value: params.value * -1,
        description: `${accountFrom[0].title} => ${accountTo[0].title}`,
        date: params.date
    }

    const transactionTo = {
        accountID: params.accountTo,
        categoryID: transferenceCategories.filter(item => item.title === 'Transferência Entrada')[0].id,
        value: params.value,
        description: `${accountTo[0].title} <= ${accountFrom[0].title}`,
        date: params.date
    }

    // Transferência de saída
    await repository.insertTransaction(transactionFrom)

    // Transferência de entrada
    await repository.insertTransaction(transactionTo)

    // Transferência de saída
    await accountsRepository.updateAccountBalance(params.accountFrom, (params.value * -1))

    // Transferência de entrada
    await accountsRepository.updateAccountBalance(params.accountTo, (params.value))
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
