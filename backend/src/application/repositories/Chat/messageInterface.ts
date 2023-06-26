 import { messageImplementation } from "../../../frameworks/database/Postgres/repositories/Chat/message";
export const messageDbInterface = (
  implementationRepository: ReturnType<messageImplementation>
) => {

    const createMessage = async ( chatId: string,
        senderId: string,
        message: string) => await implementationRepository.createMessage(chatId, senderId, message)
      const getMessage = async ( chatId: string) => await implementationRepository.getMessage(chatId)
    
      return {
        createMessage,
        getMessage
      };
  
};

export type messageInterface = typeof messageDbInterface;
