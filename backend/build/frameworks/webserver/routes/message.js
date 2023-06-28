"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../../../adapters/controllers/Chat/messageController"));
const message_1 = require("../../database/Postgres/repositories/Chat/message");
const messageInterface_1 = require("../../../application/repositories/Chat/messageInterface");
const messageRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, messageController_1.default)(messageInterface_1.messageDbInterface, message_1.messageDbImplementaion);
    router.post('/', controller.addMessage);
    router.get('/:chatId', controller.getMessages);
    return router;
};
exports.default = messageRouter;
