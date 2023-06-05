// import { companyDbImplementation } from "../../frameworks/database/Postgres/repositories/companyRepostoriesImplementation";
import { companyImplementation } from "../../../frameworks/database/Postgres/repositories/company/companyRepostories";
import { addRequestFormData } from "../../../types/companyInterfaceTypes";
import { studentDetails,demoDetails } from "../../../types/companyInterfaceTypes";

export const companyDbInterface= (
  implementationRepository: ReturnType<companyImplementation>
) => {
  const addRequests = async (requestData:addRequestFormData ) => {
    console.log(addRequests);
    console.log("this is interface")

    return await implementationRepository.postRequest(requestData);
  };

  const insertStudentDetails=(studentDetails:studentDetails,addRequestId:BigInt)=>{
    return implementationRepository.createStudentDetails(studentDetails,addRequestId)
  }

  const postDemo=(demoDetails:demoDetails)=>{
    console.log('interface');
    
    return implementationRepository.postDemoRequest(demoDetails)
  }


  return {
    addRequests,
    insertStudentDetails,
    postDemo,
  };


};
export type CompanysDbInterface = typeof companyDbInterface;
