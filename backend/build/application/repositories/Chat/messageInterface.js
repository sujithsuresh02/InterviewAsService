"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDbInterface = void 0;
const messageDbInterface = (implementationRepository) => {
    const createMessage = async (chatId, senderId, message) => await implementationRepository.createMessage(chatId, senderId, message);
    const getMessage = async (chatId) => await implementationRepository.getMessage(chatId);
    return {
        createMessage,
        getMessage
    };
};
exports.messageDbInterface = messageDbInterface;
