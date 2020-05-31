const { handleError } = require("../../utils/common");
const scope = require("./scope");
const service = require("./service");

module.exports = {
    createAccount,
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
