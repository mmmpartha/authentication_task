"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../package.json"));
/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
    version: package_json_1.default.version,
    name: package_json_1.default.name,
    description: package_json_1.default.description,
    nodeEnv: (_a = process.env['NODE_ENV']) !== null && _a !== void 0 ? _a : 'development',
    port: (_b = process.env['PORT']) !== null && _b !== void 0 ? _b : 3000,
    clientCorsOrigins: {
        'test': (_c = process.env['DEV_ORIGIN']) !== null && _c !== void 0 ? _c : '*',
        'development': (_d = process.env['DEV_ORIGIN']) !== null && _d !== void 0 ? _d : '*',
        'production': (_e = process.env['PROD_ORIGIN']) !== null && _e !== void 0 ? _e : 'none'
    }
};
exports.default = config;
