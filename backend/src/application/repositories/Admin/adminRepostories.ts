
import { UUID } from "crypto";
import { adminDbImplementation } from "../../../frameworks/database/Postgres/repositories/Admin/adminImplementation"
import { Plans, adminFormValues, editPlans } from "../../../types/adminInterfaceType";
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

   const getStudentDetails=async (id :string)=>{
    return  await implementationRepository.getStudentDetails(id);
   }

   const getFullDemoRequest=()=>{
    return implementationRepository.getDemoRequest()
  }

  const postSubscriptionPlans =(plandata:Plans)=>{
    return implementationRepository.addSubscriptionPlans(plandata)
  }
  const getFullPlans =()=>{
    return implementationRepository.getAllPlans()
  }
  const deletePlans =(id:string)=>{
    return implementationRepository.deletePlans(id)
  }
 
  const editPlan =(editedData:editPlans)=>{
    return implementationRepository.editPlans(editedData)
  }
 
 
       return{
        registerAdmin,
        getCompanyByEmail,
        getAllRequest,
        getStudentDetails,
        getFullDemoRequest,
        postSubscriptionPlans,
        getFullPlans,
        deletePlans,
        editPlan
       }
  }

export type adminDbInterface = typeof adminRepositoryInterface;
