const { handleError } = require("../../utils/common");
const scope = require("./scope");
const service = require("./service");

module.exports = {
    insertTransaction,
    getTransactions,
    getTransactionsValue,
    insertTransference,
};

async function insertTransaction(req, res) {
    try {
        const params = {
            userID: req.user.id,
            accountID: req.body.accountID,
            categoryID: req.body.categoryID,
            value: req.body.value || 0,
            description: req.body.description || "",
            date: req.body.date,
        };

        await scope.insertTransaction(params);

        await service.insertTransaction(params);

        res.status(201).json({
            content: {},
            message: "Transaction successfully inserted",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function insertTransference(req, res) {
    try {
        const params = {
            userID: req.user.id,
            accountFrom: req.body.accountFrom,
            accountTo: req.body.accountTo,
            value: req.body.value || 0,
            date: req.body.date,
        };

        await scope.insertTransference(params);

        await service.insertTransference(params);

        res.status(201).json({
            content: {},
            message: "Transaction successfully inserted",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getTransactions(req, res) {
    try {
        const params = {
            userID: req.user.id,
            accountsID: req.body.accountsID || [],
            categoriesID: req.body.categoriesID || [],
            date: req.body.date,
        };

        await scope.getTransactions(params);

        const data = await service.getTransactions(params);

        res.status(200).json({
            content: data,
            message: "Request completed",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getTransactionsValue(req, res) {
    try {
        const params = {
            userID: req.user.id,
            date: req.query.date
        };

        await scope.getTransactionsValue(params);

        const data = await service.getTransactionsValue(params.userID, params.date);

        res.status(200).json({
            content: data,
            message: "Request completed",
        });
    } catch (e) {
        return handleError(res, e);
    }
}
