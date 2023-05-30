// import { companyDbImplementation } from "../../frameworks/database/Postgres/repositories/companyRepostoriesImplementation";
import { companyImplementation } from "../../../frameworks/database/Postgres/repositories/company/companyRepostories";
import { addRequestFormData } from "../../../types/companyInterfaceTypes";
import { studentDetails } from "../../../types/companyInterfaceTypes";
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
  return {
    addRequests,
    insertStudentDetails
  };


};
export type CompanysDbInterface = typeof companyDbInterface;
