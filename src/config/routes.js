const { authMiddleware } = require('../utils/auth');

const users = require('../core/users/controller');
const accounts = require('../core/accounts/controller');
const categories = require('../core/categories/controller');
const transactions = require('../core/transactions/controller');
const articles = require('../core/articles/controller')

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

    app.route('/account-types')
        .get(accounts.getAccountTypes);

    // Categories
    app.route('/categories')
        .post(categories.createCategory)
        .get(categories.getCategories)
    app.route('/categories/:id')
        .get(categories.getCategoryByID)
        .put(categories.updateCategory)

    app.route('/transactions')
        .post(transactions.insertTransaction)

    app.route('/transactions-search')
        .post(transactions.getTransactions)

    app.route('/monthly-balance')
        .get(transactions.getTransactionsValue)

    app.route('/articles')
        .get(articles.getArticles)
};
