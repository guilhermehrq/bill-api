const jwt = require('jsonwebtoken');

module.exports = {
    authMiddleware,
    generateToken
}

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2) {
        return res.status(401).json({
            message: 'Token error'
        });
    }

    const [ scheme, token ] = tokenParts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({
            message: 'Token malformatted'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        req.user = decoded;

        next();
    });
}

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: 592200,
    });
}
