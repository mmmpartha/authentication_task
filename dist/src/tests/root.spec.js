"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('root endpoint get and post', () => {
    test('get to / returns 200 and data', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/');
        expect(result.statusCode).toEqual(200);
        expect(result.body.name).toBeTruthy();
    }));
    test('post to / echoes json', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post('/').send({
            'test': 'value'
        });
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBeTruthy();
        expect(result.body.test).toBe('value');
    }));
    test('404 & json returned from nonexistent route', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/badPath');
        expect(result.statusCode).toEqual(404);
        expect(result.body.message).toBeTruthy();
    }));
});
