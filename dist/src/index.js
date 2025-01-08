"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
app_1.default.listen(config_1.default.port, () => {
    console.log(`🚀 ${config_1.default.name} ${config_1.default.version} 🚀`);
    console.log(`🚀 Listening on ${config_1.default.port} with NODE_ENV=${config_1.default.nodeEnv} 🚀`);
});
