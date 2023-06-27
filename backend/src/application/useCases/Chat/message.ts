import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { chatInterface } from "../../repositories/Chat/Chat";
import { messageInterface } from "../../repositories/Chat/messageInterface";

export const messageAdd = async (
    chatId: string,
    senderId: string,
    message: string,
    repository: ReturnType<messageInterface>
  ) => {
    const messages = await repository.createMessage(chatId, senderId, message);
  
    if (!messages) {
      throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
    }
    return messages;
  };
  export const getMessage = async (
    chatId: string,
    repository: ReturnType<messageInterface>
  ) => {
    const messages = await repository.getMessage(chatId);
  console.log(messages,"message usecase");
  
    if (!messages) {
      throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
    }
    return messages;
  };