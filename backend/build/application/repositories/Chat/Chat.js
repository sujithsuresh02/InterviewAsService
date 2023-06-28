"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatDbInterface = void 0;
const chatDbInterface = (implementationRepository) => {
    const createChat = async (senderId) => await implementationRepository.createChat(senderId);
    const getAllChat = async (userId, role) => await implementationRepository.getAllChat(userId, role);
    const getChat = async (firstId, secondId) => await implementationRepository.getChat(firstId, secondId);
    return {
        createChat,
        getAllChat,
        getChat,
    };
};
exports.chatDbInterface = chatDbInterface;
