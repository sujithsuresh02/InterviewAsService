import express from "express";
import messageController from "../../../adapters/controllers/Chat/messageController";
import { messageDbImplementaion } from "../../database/Postgres/repositories/Chat/message";
import { messageDbInterface } from "../../../application/repositories/Chat/messageInterface";
const messageRouter = () => {
  const router = express.Router();
  const controller = messageController(messageDbInterface, messageDbImplementaion);
  router.post('/', controller.addMessage);

router.get('/:chatId', controller.getMessages);

  return router;
};
export default messageRouter;