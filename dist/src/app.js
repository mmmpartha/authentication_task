"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const fourOhFour_1 = __importDefault(require("./middleware/fourOhFour"));
const root_1 = __importDefault(require("./routes/root"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
// Apply most middleware first
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    // @ts-ignore no-implicit-any
    origin: (_a = config_1.default.clientCorsOrigins[config_1.default.nodeEnv]) !== null && _a !== void 0 ? _a : "*",
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("tiny"));
// Apply routes before error handling
app.use("/", root_1.default);
app.use("/auth", auth_1.default);
// Apply error handling last
app.use(fourOhFour_1.default);
app.use(errorHandler_1.default);
exports.default = app;
