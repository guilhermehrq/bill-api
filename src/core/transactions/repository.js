const { pool } = require('../../config/database');

module.exports = {
    insertTransaction,
    getTransactions,
    getTransactionsValue,
};

async function insertTransaction(params) {
    const { accountID, categoryID, value, description, date } = params;

    await pool.query(
        `INSERT INTO transactions(account_id, category_id, value, description, date)
              VALUES ($1, $2, $3, $4, $5)`,
        [accountID, categoryID, value, description, date]
    );
}

async function getTransactions(params) {
    const {
        userID,
        accountsID,
        categoriesID,
        date,
    } = params;

    const filters = [];

    if (accountsID.length){
        filters.push(`AND t.account_id IN (${accountsID.join(',')})`)
    }

    if (categoriesID.length) {
        filters.push(`AND t.category_id IN (${categoriesID.join(',')})`)
    }

    const res = await pool.query(
        `SELECT trim(to_char(t.date, 'Day')) || ', ' || to_char(t.date, 'DD') AS "transactionDate",
                (SELECT json_agg(exp) AS "transactions"
                   FROM (SELECT t2.id,
                        t2.value,
                        t2.description,
                        c.title        AS "categoryTitle",
                        c.icon         AS "categoryIcon",
                        c.color        AS "categoryColor",
                        a.title        AS "accountTitle"
                   FROM transactions t2
                  INNER JOIN categories c ON (c.id = t2.category_id)
                  INNER JOIN accounts   a ON (a.id = t2.account_id)
                  WHERE t2.date   = t.date
                    AND a.user_id = $1) AS exp)
           FROM transactions t
          INNER JOIN accounts ac ON (ac.id = t.account_id)
          WHERE ac.user_id                 = $1
            AND to_char(t.date, 'MM/YYYY') = $2
            AND t.active IS TRUE
            ${filters.join(" ")}
          GROUP BY date ORDER BY "transactionDate" DESC;`,
          [userID, date]
    )

    return res.rows;
}

async function getTransactionsValue(userID, transactionType, date) {
    const transactionValue = transactionType === 'I' ? 'AND t.value > 0' : 'AND t.value < 0';

    return await pool.query(
        `SELECT SUM(t.value) AS value
           FROM transactions t
          INNER JOIN accounts a ON (a.id = t.account_id)
          WHERE a.user_id                    = $1
            AND to_char(t."date", 'MM/YYYY') = $2
            AND t.active IS TRUE
            ${transactionValue};`,
          [userID, date]
    );
}
