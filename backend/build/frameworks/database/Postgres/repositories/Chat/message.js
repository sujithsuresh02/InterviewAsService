"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDbImplementaion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../../Connection/connection");
const chat_1 = require("../../models/chat");
connection_1.sequelize
    .sync()
    .then(() => {
    console.log(" message Database synchronized successfully!");
})
    .catch((error) => {
    console.log(error);
});
const messages = (0, chat_1.initMessageModel)(connection_1.sequelize);
const messageDbImplementaion = () => {
    const createMessage = async (chatId, senderId, message) => {
        const newMessage = {
            chatId,
            senderId,
            message,
        };
        const resposne = await messages.create(newMessage, {
            returning: true
        });
        console.log(resposne);
        console.log(resposne?.dataValues, "==================================");
        return resposne.dataValues;
    };
    const getMessage = async (chatId) => {
        const query = ` SELECT * FROM "messages" WHERE "chatId"=:chatId
        `;
        const response = await connection_1.sequelize.query(query, {
            replacements: { chatId },
            type: sequelize_1.QueryTypes.SELECT
        });
        console.log(response, "resposne");
        return response;
    };
    return {
        createMessage,
        getMessage,
    };
};
exports.messageDbImplementaion = messageDbImplementaion;
