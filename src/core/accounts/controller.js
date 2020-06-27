const { handleError } = require("../../utils/common");
const scope = require("./scope");
const service = require("./service");

module.exports = {
    createAccount,
    updateAccount,
    getAccounts,
    getAccountByID,
    getAccountTypes,
};

async function createAccount(req, res) {
    try {
        const params = {
            userID: req.user.id,
            title: req.body.title,
            initialBalance: req.body.initialBalance || 0,
            typeID: req.body.typeID,
            color: req.body.color || "",
            includeDashboard: req.body.includeDashboard,
            mainAccount: req.body.mainAccount,
        };

        await scope.createAccount(params);

        await service.createAccount(params);

        res.status(201).json({
            content: {},
            message: "Account successfully created",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function updateAccount(req, res) {
    try {
        const params = {
            userID: req.user.id,
            id: req.params.id,
            title: req.body.title,
            actualBalance: req.body.actualBalance || 0,
            typeID: req.body.typeID,
            color: req.body.color || "",
            includeDashboard: req.body.includeDashboard,
            mainAccount: req.body.mainAccount,
            active: req.body.active,
        };

        await scope.updateAccount(params);

        await service.updateAccount(params);

        res.status(200).json({
            content: {},
            message: "Account successfully updated",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getAccounts(req, res) {
    try {
        const params = {
            userID: req.user.id,
            includeDashboard: req.query.includeDashboard || null,
            active: req.query.active || null,
        };

        await scope.getAccounts(params);

        const data = await service.getAccounts(params);

        res.status(200).json({
            content: data,
            message: "Request completed",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getAccountByID(req, res) {
    try {
        const params = {
            userID: req.user.id,
            accountID: req.params.id
        };

        await scope.getAccountByID(params);

        const data = await service.getAccountByID(params);

        res.status(200).json({
            content: data,
            message: "Request completed",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getAccountTypes(req, res) {
    try {
        const data = await service.getAccountTypes();

        res.status(200).json({
            content: data,
            message: "Request completed",
        });
    } catch (e) {
        return handleError(res, e);
    }
}
