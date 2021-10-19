const createError = require('http-errors');

const notFoundHandler = (req, res, next) => {
    next(createError(404, 'your requested page was not found'));
}

const errorHandler = (err,req,res,next) => {
    res.status(err.status).json({
        error: err.message
    });
}

module.exports = {
    notFoundHandler,
    errorHandler
}