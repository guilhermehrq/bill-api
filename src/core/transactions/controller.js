const { handleError } = require("../../utils/common");
const scope = require("./scope");
const service = require("./service");

module.exports = {
    insertTransaction,
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
