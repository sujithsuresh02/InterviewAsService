"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatDbImplementaion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../../Connection/connection");
const chat_1 = require("../../models/chat");
connection_1.sequelize
    .sync()
    .then(() => {
    console.log("Database synchronized successfully!");
})
    .catch((error) => { });
const chat = (0, chat_1.initChatModel)(connection_1.sequelize);
const chatDbImplementaion = () => {
    const createChat = async (senderId) => {
        try {
            const query = `SELECT "id"  FROM "admins"`;
            const admins = await connection_1.sequelize.query(query, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(admins, "admins");
            const existingquery = ` SELECT "clientId" FROM "chats" WHERE "clientId"=:senderId
          `;
            const existingChat = await connection_1.sequelize.query(existingquery, {
                replacements: { senderId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(existingChat, "existing chat");
            if (existingChat.length > 0) {
                return existingChat[0].clientId;
            }
            else {
                const clientId = senderId;
                const adminId = admins[0].id;
                const data = {
                    adminId,
                    clientId,
                };
                console.log(data, "data");
                const result = await chat.create(data);
                console.log(result);
                return true;
            }
        }
        catch (error) {
            console.error("Error creating chat:", error);
            throw error;
        }
    };
    const getAllChat = async (Id, role) => {
        console.log(Id);
        try {
            let response = null;
            if (role === "admin") {
                const query = `  SELECT c.*, ch.*
        FROM "companies" AS c
        JOIN "chats" AS ch ON ch."clientId" = c."id"
        WHERE ch."adminId" = :Ids;
      `;
                response = await connection_1.sequelize.query(query, {
                    replacements: { Ids: Id },
                    type: sequelize_1.QueryTypes.SELECT,
                });
            }
            if (role === "company") {
                const query = ` SELECT a.*, ch.*
        FROM "admins" AS a
        JOIN "chats" AS ch ON ch."adminId" = a."id"
        WHERE ch."clientId" = :Id;
        
      ;`;
                response = await connection_1.sequelize.query(query, {
                    replacements: { Id },
                    type: sequelize_1.QueryTypes.SELECT,
                });
            }
            const query = ` SELECT "clientId" FROM "chats" WHERE "clientId" = :clientId `;
            console.log(response, "response");
            return response;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getChat = async (firstId, secondId) => {
        try {
            const query = ` SELECT * FROM "chats" WHERE "clientId" = :firstId  AND "adminId"=:secondId`;
            const result = connection_1.sequelize.query(query, {
                replacements: { firstId, secondId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result;
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        createChat,
        getAllChat,
        getChat,
    };
};
exports.chatDbImplementaion = chatDbImplementaion;
