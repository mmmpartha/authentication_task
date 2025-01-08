"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * JSON 404 response
 */
const fourOhFour = (_req, res) => {
    return res.status(404).json({ message: 'not found' });
};
exports.default = fourOhFour;
