const { handleError } = require("../../utils/common");
const scope = require("./scope");
const service = require("./service");

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
};

async function createCategory(req, res) {
    try {
        const params = {
            userID: req.user.id,
            title: req.body.title,
            type: req.body.type,
            color: req.body.color,
            icon: req.body.icon,
            active: true,
        };

        await scope.createCategory(params);

        await service.createCategory(params);

        res.status(201).json({
            content: {},
            message: "Category successfully created",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function getCategories(req, res) {
    try {
        const params = {
            userID: req.user.id,
            title: req.query.title,
            type: req.query.type,
            active: req.query.active === "false" ? false : true,
        };

        await scope.getCategories(params);

        const data = await service.getCategories(params);

        res.status(200).json({
            content: data,
            message: "Request completed",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function updateCategory(req, res) {
    try {
        const params = {
            id: req.params.id,
            title: req.body.title,
            color: req.body.color,
            icon: req.body.icon,
            active: req.body.active,
        };

        await scope.updateCategory(params);

        await service.updateCategory(params);

        res.status(200).json({
            content: {},
            message: "Category successfully updated",
        });
    } catch (e) {
        return handleError(res, e);
    }
}
