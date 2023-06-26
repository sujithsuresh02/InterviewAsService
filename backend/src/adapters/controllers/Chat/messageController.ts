import { Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import { messageInterface } from "../../../application/repositories/Chat/messageInterface";
import { messageImplementation } from "../../../frameworks/database/Postgres/repositories/Chat/message";
import {
  messageAdd,
  getMessage,
} from "../../../application/useCases/Chat/message";
const messageController = (
  messageDbInterface: messageInterface,
  messageDbImplementaion: messageImplementation
) => {
  const messageDbRepository = messageDbInterface(messageDbImplementaion());

  const addMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId, senderId, message } = req.body;
    const messages = await messageAdd(
      chatId,
      senderId,
      message,
      messageDbRepository
    );
    res.json({
      status: "success",
      messages,
    });
  });
  const getMessages = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const messages = await getMessage(chatId, messageDbRepository);
    res.json({
      status: "success",
      messages,
    });
  });

  return {
    addMessage,
    getMessages,
  };
};

export default messageController;
