const { handleError } = require("../../utils/common");
const scope = require("./scope");
const service = require("./service");

module.exports = {
    createUser,
    authentication,
};

async function createUser(req, res) {
    try {
        const body = ({ email, password, name } = req.body);

        await scope.createUser(body);

        const data = await service.createUser(body);

        res.status(201).json({
            content: data,
            message: "User successfully registered",
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function authentication(req, res) {
    try {
        const body = ({ email, password } = req.body);

        await scope.authentication(body);

        const data = await service.authentication(body);

        res.status(200).json({
            content: data,
            message: "User successfully authenticated",
        });
    } catch (e) {
        return handleError(res, e);
    }
}
