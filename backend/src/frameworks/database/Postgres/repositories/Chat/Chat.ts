import { BIGINT, QueryTypes } from "sequelize";
import { sequelize } from "../../Connection/connection";
import Sequelize from "sequelize";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { query } from "express";
import { initChatModel } from "../../models/chat";
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {});

const chat = initChatModel(sequelize);
export const chatDbImplementaion = () => {
  const createChat = async (senderId: string) => {
    try {
      const query = `SELECT "id"  FROM "admins"`;
      const admins: any = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      console.log(admins, "admins");

      const existingquery = ` SELECT "clientId" FROM "chats" WHERE "clientId"=:senderId
          `;
      const existingChat: any = await sequelize.query(existingquery, {
        replacements: { senderId },
        type: QueryTypes.SELECT,
      });
      console.log(existingChat, "existing chat");

      if (existingChat.length > 0) {
        return existingChat[0].clientId;
      } else {
        const clientId: string = senderId;
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
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };
  const getAllChat = async (Id: string, role: string) => {
    console.log(Id);
    
    try {
      let response = null;
      if (role === "admin") {
        const query = ` SELECT * FROM "companies" WHERE "id" IN (
        SELECT "clientId" FROM "chats" WHERE "adminId" = :Ids
      )`;

        response = await sequelize.query(query, {
          replacements: { Ids:Id },
          type: QueryTypes.SELECT,
        });
      }
      if (role === "company") {
        const query = ` SELECT * FROM "admins" WHERE "id" IN (
        SELECT "adminId" FROM "chats" WHERE "clientId" = :Id
      );`;

        response = await sequelize.query(query, {
          replacements: { Id },
          type: QueryTypes.SELECT,
        });
      }
      const query = ` SELECT "clientId" FROM "chats" WHERE "clientId" = :clientId `;

      console.log(response, "response");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getChat = async (firstId: string, secondId: string) => {
    try {
      const query = ` SELECT * FROM "chats" WHERE "clientId" = :firstId  AND "adminId"=:secondId`;

      const result = sequelize.query(query, {
        replacements: { firstId, secondId },
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createChat,
    getAllChat,
    getChat,
  };
};

export type chatImplementation = typeof chatDbImplementaion;
