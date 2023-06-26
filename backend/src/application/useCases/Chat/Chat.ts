import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { chatInterface } from "../../repositories/Chat/Chat";




export const chatCreate = async (
    senderId: string,
    chatDbRepository: ReturnType<chatInterface>
  ) => {
    const chat :any= await chatDbRepository.createChat(senderId);
  
    if (!chat) {
      throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
    }
    console.log(chat,"chayyt");
    
    return chat;
  };
  export const getAllChats = async (
    userId: string,
    role:string,
    chatDbRepository: ReturnType<chatInterface>
  ) => {
    const getChats = await chatDbRepository.getAllChat(userId,role);
    if (!getChats) {
      throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
    }
    return getChats;
  };
  export const getChat = async (
    firstId: string,
    secondId: string,
    chatDbRepository: ReturnType<chatInterface>
  ) => {
    const getChats = await chatDbRepository.getChat(firstId, secondId);
    if (!getChats) {
      throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
    }
    return getChats;
  };