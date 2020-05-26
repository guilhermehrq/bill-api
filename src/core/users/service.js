const jwt = require('jsonwebtoken');

module.exports = {
    generateToken
}

function generateToken(user) {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 84600,
    });

    user.token = token;

    return user;
}
