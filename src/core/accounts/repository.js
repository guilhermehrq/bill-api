const { pool } = require("../../config/database");

module.exports = {
    createAccount,
    updateMainAccount,
    updateAccount,
    getAccounts,
    getAccountByID,
    updateAccountBalance,
};

async function createAccount(params) {
    const {
        userID,
        title,
        initialBalance,
        typeID,
        includeDashboard,
        mainAccount,
    } = params;

    return await pool.query(
        `INSERT INTO accounts(user_id, title, initial_balance, actual_balance, type_id,
                              include_dashboard, main_account, created_at)
              VALUES($1, $2, $3, $3, $4,
                     $5, $6, now())`,
        [
            userID,
            title,
            initialBalance,
            typeID,
            includeDashboard,
            mainAccount,
        ]
    );
}

async function updateMainAccount(userID) {
    return await pool.query(
        `UPDATE accounts
            SET main_account = false
          WHERE user_id      = $1
            AND main_account = true`,
        [userID]
    );
}

async function updateAccount(params) {
    const {
        id,
        userID,
        title,
        actualBalance,
        typeID,
        includeDashboard,
        mainAccount,
        active,
    } = params;

    return await pool.query(
        `UPDATE accounts
            SET title             = $1,
                actual_balance    = $2,
                type_id           = $3,
                include_dashboard = $4,
                main_account      = $5,
                active            = $6,
                updated_at        = now()
          WHERE id      = $7
            AND user_id = $8`,
        [
            title,
            actualBalance,
            typeID,
            includeDashboard,
            mainAccount,
            active,
            id,
            userID,
        ]
    );
}

async function getAccounts(params) {
    const filters = [];
    const { userID, includeDashboard, active } = params;

    if (includeDashboard != null) {
        filters.push(`AND a.include_dashboard = ${includeDashboard}`);
    }

    if (active != null) {
        filters.push(`AND a.active = ${active}`);
    }

    const res = await pool.query(
        `SELECT a.id,
                a.title,
                a.actual_balance AS "actualBalance",
                a.type_id        AS "typeID",
                act.title        AS "typeTitle",
                act.color,
                act.icon
           FROM accounts a
          INNER JOIN account_types act ON (act.id = a.type_id)
          WHERE a.user_id = $1 ${filters.join(" ")}
          ORDER BY a.title`,
        [userID]
    );

    return res.rows;
}

async function getAccountByID(accountID, userID) {
    const res = await pool.query(
        `SELECT id,
                user_id           as "userID",
                title,
                initial_balance   as "initialBalance",
                actual_balance    as "actualBalance",
                type_id           as "typeID",
                include_dashboard as "includeDashboard",
                main_account      as "mainAccount",
                active
           FROM accounts
          WHERE id      = $1
            AND user_id = $2`,
        [accountID, userID]
    );

    return res.rows;
}

async function updateAccountBalance(accountID, value) {
    return await pool.query(
        `UPDATE accounts
            SET actual_balance = actual_balance + ($1)
          WHERE id = $2`,
        [ value, accountID ]
    );
}
