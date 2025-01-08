"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
/**
 * Health check endpoint
 */
const getRoot = (_req, res) => {
    res.status(200).json({
        name: config_1.default.name,
        description: config_1.default.description,
        version: config_1.default.version
    });
};
exports.default = getRoot;
