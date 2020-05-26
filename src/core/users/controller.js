const { handleError } = require('../../utils/common');
const scope = require('./scope');
const repository = require('./repository');
const service = require('./service');

module.exports = {
    createUser,
    authentication
}

async function createUser(req, res) {
    try {
        const body = { email, password, name } = req.body;

        await scope.createUser(body);

        await repository.createUser(body);

        res.status(201).json({
            content: {},
            message: 'User successfully registered',
        });
    } catch (e) {
        return handleError(res, e);
    }
}

async function authentication(req, res) {
    try {
        const body = { email, password } = req.body;

        await scope.authentication(body);

        const user = await repository.authentication(body);

        const data = service.generateToken(user);

        res.status(200).json({
            content: data,
            message: 'User successfully authenticated',
        });
    } catch (e) {
        return handleError(res, e);
    }
}
