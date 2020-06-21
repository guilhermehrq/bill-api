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
        color,
        includeDashboard,
        mainAccount,
    } = params;

    return await pool.query(
        `INSERT INTO accounts(user_id, title, initial_balance, actual_balance, type_id,
                              color, include_dashboard, main_account, created_at)
              VALUES($1, $2, $3, $3, $4,
                     $5, $6, $7, now())`,
        [
            userID,
            title,
            initialBalance,
            typeID,
            color,
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
        color,
        includeDashboard,
        mainAccount,
        active,
    } = params;

    return await pool.query(
        `UPDATE accounts
            SET title             = $1,
                actual_balance    = $2,
                type_id           = $3,
                color             = $4,
                include_dashboard = $5,
                main_account      = $6,
                active            = $7,
                updated_at        = now()
          WHERE id      = $8
            AND user_id = $9`,
        [
            title,
            actualBalance,
            typeID,
            color,
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
        filters.push(`AND include_dashboard = ${includeDashboard}`);
    }

    if (active != null) {
        filters.push(`AND active = ${active}`);
    }

    const res = await pool.query(
        `SELECT id,
                title,
                actual_balance as "actualBalance",
                type_id        as "typeID",
                color
           FROM accounts
          WHERE user_id = $1 ${filters.join(" ")}
          ORDER BY title`,
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
                color,
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
