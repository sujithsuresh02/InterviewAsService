import { Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import { chatImplementation } from "../../../frameworks/database/Postgres/repositories/Chat/Chat";
import { chatInterface } from "../../../application/repositories/Chat/Chat";
import {
  getAllChats,
  chatCreate,
  getChat,
} from "../../../application/useCases/Chat/Chat";
import { log } from "console";

const chatController = (
  chatDbInterface: chatInterface,
  chatDbImplementation: chatImplementation
) => {
  const chatDbRepository = chatDbInterface(chatDbImplementation());

  const createChat = asyncHandler(async (req: Request, res: Response) => {
    const { senderId } = req.body;
    const newChat = await chatCreate(senderId, chatDbRepository);
    console.log(newChat, "newchat");

    res.json({
      status: "success",
      newChat,
    });
  });
  const Chats = asyncHandler(async (req: Request, res: Response) => {
    const { Id } = req.params;
    const { role } = req.params;
    const chats = await getAllChats(Id, role, chatDbRepository);
    res.json({
      status: "success",
      chats,
    });
  });
  const findChat = asyncHandler(async (req: Request, res: Response) => {
    const { firstId } = req.params;
    const { secondId } = req.params;
    const chat = await getChat(firstId, secondId, chatDbRepository);
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

export default chatController;
