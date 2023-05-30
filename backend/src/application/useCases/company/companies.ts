import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { addRequestFormData } from "../../../types/companyInterfaceTypes";
import { CVDetails } from "../../../types/companyInterfaceTypes";
import { CompanysDbInterface } from "../../repositories/companyRepositories/companyRepostories";
import { CompanyDbServiceInterface } from "../../services/companyServiceInterface";
let addRequestId :BigInt;
export const postRequest = async (
  data: addRequestFormData,
  CompanyDbRepository: ReturnType<CompanysDbInterface>,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>
) => {
 addRequestId  = await CompanyDbRepository.addRequests(data);
    console.log(addRequestId);
    console.log('first');
    
    console.log('response of cv details inserted ');
    return addRequestId
}



  export const postRequestWithCVDetails = async (
    
  cvDetails: CVDetails,
  CompanyDbRepository: ReturnType<CompanysDbInterface>,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>
): Promise<Number> => {
  let uploadedCVsCount :any= 0;
  if (cvDetails.path) {
    const response = await CompanyServiceRepository.extractDataFromPdf(
      cvDetails.path
    );

    const StudentDetails = await JSON.parse(response);
    console.log(addRequestId);
     console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
     
    const insertionResult = await CompanyDbRepository.insertStudentDetails(
      StudentDetails,addRequestId
    );
   console.log('everything completed');
   
    uploadedCVsCount+=1;
   
  } else {
    console.log("CV path is undefined. Unable to extract data from PDF.");
    throw new AppError("Upload Only Pdf File", HttpStatus.UNAUTHORIZED);
  }
  console.log(uploadedCVsCount);
  
  return uploadedCVsCount
};



