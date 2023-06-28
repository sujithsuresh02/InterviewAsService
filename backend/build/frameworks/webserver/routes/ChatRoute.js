"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Chat_1 = __importDefault(require("../../../adapters/controllers/Chat/Chat"));
const Chat_2 = require("../../../application/repositories/Chat/Chat");
const Chat_3 = require("../../database/Postgres/repositories/Chat/Chat");
const chatRouter = () => {
    const controller = (0, Chat_1.default)(Chat_2.chatDbInterface, Chat_3.chatDbImplementaion);
    const router = express_1.default.Router();
    router.post("/", controller.createChat);
    router.get("/:Id/:role", controller.Chats);
    router.get("/find/:firstId/:secondId", controller.findChat);
    return router;
};
exports.default = chatRouter;
