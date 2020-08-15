const repository = require('./repository');

module.exports = {
    getArticles,
}

async function getArticles() {
    const res = await repository.getArticles();

    return res.rows;
}
