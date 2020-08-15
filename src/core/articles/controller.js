const { handleError } = require("../../utils/common");
const scope = require("./scope");
const service = require("./service");

module.exports = {
    getArticles,
};

async function getArticles(req, res) {
    try {
        const data = await service.getArticles();

        res.status(200).json({
            content: data,
            message: "Request completed",
        });
    } catch (e) {
        return handleError(res, e);
    }
}
