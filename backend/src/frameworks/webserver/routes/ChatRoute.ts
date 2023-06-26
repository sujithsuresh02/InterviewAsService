import express from "express";

import chatController from "../../../adapters/controllers/Chat/Chat";
import { chatDbInterface } from "../../../application/repositories/Chat/Chat";
import { chatDbImplementaion } from "../../database/Postgres/repositories/Chat/Chat";
const chatRouter = () => {
  const controller = chatController(chatDbInterface, chatDbImplementaion);

  const router = express.Router();
  router.post("/", controller.createChat);
  router.get("/:Id/:role", controller.Chats);
  router.get("/find/:firstId/:secondId", controller.findChat);

  return router;
};
export default chatRouter;
