const users = require('../core/users/controller');

module.exports = (app) => {
    app.route('/ping').get((req, res) =>{
        res.status(200).json({
            data: Date().toString(),
            message: 'up'
        })
    });

    app.route('/users')
        .post(users.createUser)

    app.route('/auth')
        .post(users.authentication)
};
