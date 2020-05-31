const repository = require('./repository');

module.exports = {
    createAccount,
}

async function createAccount(params) {
    if (params.mainAccount) {
        await repository.updateMainAccount(params.userID);
    }

    await repository.createAccount(params)
}
