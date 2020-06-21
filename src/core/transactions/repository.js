const { pool } = require('../../config/database');

module.exports = {
    insertTransaction
};

async function insertTransaction(params) {
    const { accountID, categoryID, value, description, date } = params;

    await pool.query(
        `INSERT INTO transactions(account_id, category_id, value, description, date)
              VALUES ($1, $2, $3, $4, $5)`,
        [accountID, categoryID, value, description, date]
    );
}

// async function getTransactions(params) {
//     const {
//         userID,
//         accountsID,
//         categoriesID,
//         monthRef,
//         categoryType,
//     }
// }
