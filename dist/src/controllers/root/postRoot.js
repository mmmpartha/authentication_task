"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Echo endpoint
 */
const postRoot = (req, res) => {
    const json = req.body;
    res.json(json);
};
exports.default = postRoot;
