"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Chat_1 = require("../../../application/useCases/Chat/Chat");
const chatController = (chatDbInterface, chatDbImplementation) => {
    const chatDbRepository = chatDbInterface(chatDbImplementation());
    const createChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { senderId } = req.body;
        const newChat = await (0, Chat_1.chatCreate)(senderId, chatDbRepository);
        console.log(newChat, "newchat");
        res.json({
            status: "success",
            newChat,
        });
    });
    const Chats = (0, express_async_handler_1.default)(async (req, res) => {
        const { Id } = req.params;
        const { role } = req.params;
        const chats = await (0, Chat_1.getAllChats)(Id, role, chatDbRepository);
        res.json({
            status: "success",
            chats,
        });
    });
    const findChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { firstId } = req.params;
        const { secondId } = req.params;
        const chat = await (0, Chat_1.getChat)(firstId, secondId, chatDbRepository);
        res.json({
            status: "success",
            chat,
        });
    });
    return {
        createChat,
        Chats,
        findChat,
    };
};
exports.default = chatController;
