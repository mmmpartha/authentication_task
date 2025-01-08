"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
/**
 * 500 response & log when errors are raised.
 */
const errorHandler = (err, _req, res) => {
    console.error(err);
    return res.status(500).json({
        message: config_1.default.nodeEnv === 'production' ?
            'unknown error' :
            `${err}`
    });
};
exports.default = errorHandler;
