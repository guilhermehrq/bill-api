const { authMiddleware } = require('../utils/auth');

const users = require('../core/users/controller');
const accounts = require('../core/accounts/controller');

module.exports = (app) => {
    app.route('/ping').get((req, res) =>{
        res.status(200).json({
            data: Date().toString(),
            message: 'up'
        })
    });

    // Users
    app.route('/users').post(users.createUser);
    app.route('/auth').post(users.authentication);

    app.use(authMiddleware);

    // Accounts
    app.route('/accounts')
        .get(accounts.getAccounts)
        .post(accounts.createAccount);
    app.route('/accounts/:id')
        .get(accounts.getAccountByID)
        .put(accounts.updateAccount);
};
