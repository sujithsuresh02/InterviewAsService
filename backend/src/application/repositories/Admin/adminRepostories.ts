
import { adminDbImplementation } from "../../../frameworks/database/Postgres/repositories/Admin/adminImplementation"
import { adminFormValues } from "../../../types/adminInterfaceType";
  export const adminRepositoryInterface=(
    implementationRepository: ReturnType<adminDbImplementation>
  )=>{

    const registerAdmin = async (requestData:adminFormValues ) => {
    
        return await implementationRepository.adminSignup(requestData);
      };

      
  const getCompanyByEmail= async (email: string) =>{
 return await implementationRepository.getCompanyByEmail (email);
  }
   const getAllRequest=async ()=>{
    return  await implementationRepository.getFullRequest();
   }
       return{
        registerAdmin,
        getCompanyByEmail,
        getAllRequest
       }
  }

export type adminDbInterface = typeof adminRepositoryInterface;
