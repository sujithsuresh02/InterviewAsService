import { QueryTypes } from "sequelize";
import { sequelize } from "../../Connection/connection";
import Sequelize from "sequelize";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { query } from "express";
import { initMessageModel } from "../../models/chat";
sequelize
  .sync()
  .then(() => {
    console.log(" message Database synchronized successfully!");
  })
  .catch((error) => {
    console.log(error);
    
  });

const messages = initMessageModel(sequelize);
export const messageDbImplementaion = () => {
  const createMessage = async (
    chatId: string,
    senderId: string,
    message: string
  ) => {
    const newMessage = {
      chatId,
      senderId,
      message,
    };
    const resposne = messages.create(newMessage);

    return true;
  };
  const getMessage = async (chatId: string) => {
   const query =` SELECT * FROM "messages" WHERE "chatId"=:chatId
        `
        const response=  await sequelize.query(query,{
            replacements:{chatId},
            type:QueryTypes.SELECT
        })
        console.log(response);
       return response 
  };

  return {
    createMessage,
    getMessage,
  };
};

export type messageImplementation = typeof messageDbImplementaion;
