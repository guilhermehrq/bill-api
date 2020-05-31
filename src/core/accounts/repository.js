const { pool } = require("../../config/database");

module.exports = {
    createAccount,
    updateMainAccount,
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
                              color, include_dashboard, main_account, register_date)
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
          WHERE user_id = $1
            AND active = true`,
        [userID]
    );
}
