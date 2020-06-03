const repository = require('./repository');

module.exports = {
    createAccount,
    updateAccount,
    getAccounts,
    getAccountByID,
}

async function createAccount(params) {
    if (params.mainAccount) {
        await repository.updateMainAccount(params.userID);
    }

    await repository.createAccount(params)
}

async function updateAccount(params) {
    if (params.mainAccount) {
        await repository.updateMainAccount(params.userID);
    }

    await repository.updateAccount(params)
}

async function getAccounts(params) {
    const res = await repository.getAccounts(params);

    if (!res.length) {
        return {
            accounts: [],
            totalBalance: 0,
        }
    }

    const accounts = res.map(account => {
        return {
            ...account,
            actualBalance: +account.actualBalance,
        }
    });

    const accountsBalance = accounts.map(account => account.actualBalance)
    const totalBalance = accountsBalance.reduceRight((ac, current) => ac + current);

    return {
        accounts,
        totalBalance,
    }
}

async function getAccountByID(params) {
    const { accountID, userID } = params;

    const res = await repository.getAccountByID(accountID, userID);

    if (!res.length) {
        throw {
            statusCode: 404,
            message: "Account not found",
        };
    }

    const account = res[0];

    account.actualBalance = +account.actualBalance;
    account.initialBalance = +account.initialBalance;

    return account;
}
