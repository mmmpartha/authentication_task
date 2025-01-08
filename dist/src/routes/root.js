"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getRoot_1 = __importDefault(require("../controllers/root/getRoot"));
const postRoot_1 = __importDefault(require("../controllers/root/postRoot"));
const root = express_1.default.Router();
root.get('/', getRoot_1.default);
root.post('/', postRoot_1.default);
exports.default = root;
