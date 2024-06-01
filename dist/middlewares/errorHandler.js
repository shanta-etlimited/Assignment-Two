"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Something went wrong',
    });
};
exports.errorHandler = errorHandler;
