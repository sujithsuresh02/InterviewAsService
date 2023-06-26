import { chatImplementation } from "../../../frameworks/database/Postgres/repositories/Chat/Chat";
export const chatDbInterface = (
  implementationRepository: ReturnType<chatImplementation>
) => {
  const createChat = async (senderId: string) =>
    await implementationRepository.createChat(senderId);
  const getAllChat = async (userId: string,role:string) =>
    await implementationRepository.getAllChat(userId,role);
  const getChat = async (firstId: string, secondId: string) =>
    await implementationRepository.getChat(firstId, secondId);

  return {
    createChat,
    getAllChat,
    getChat,
  };
};

export type chatInterface = typeof chatDbInterface;
