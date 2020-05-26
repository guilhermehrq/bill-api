module.exports = {
    handleError
}

function handleError(res, error) {
    res.status(error.statusCode || 500).json({
        message: error.message || 'Falha ao processar requisição',
        error,
    });
}
