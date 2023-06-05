import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { addRequestFormData } from "../../../types/companyInterfaceTypes";
import { CVDetails } from "../../../types/companyInterfaceTypes";
import { CompanysDbInterface } from "../../repositories/companyRepositories/companyRepostories";
import { CompanyDbServiceInterface } from "../../services/companyServiceInterface";
import { demoDetails } from "../../../types/companyInterfaceTypes";
export const postRequest = async (
  data: addRequestFormData,
  CompanyDbRepository: ReturnType<CompanysDbInterface>,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>
) => {
  let addRequestId = await CompanyDbRepository.addRequests(data);
  console.log(addRequestId);
  console.log("first");

  console.log("response of cv details inserted ");
  return { addRequestId };
};

export const postRequestWithCVDetails = async (
  cvDetails: CVDetails,
  addRequestId: BigInt,
  CompanyDbRepository: ReturnType<CompanysDbInterface>,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>
): Promise<any> => {
  let insertionResult: any;

  if (cvDetails.path) {
    const response = await CompanyServiceRepository.extractDataFromPdf(
      cvDetails.path
    );
    const StudentDetails = await JSON.parse(response);
    console.log(addRequestId);

    insertionResult = await CompanyDbRepository.insertStudentDetails(
      StudentDetails,
      addRequestId
    );
    console.log("everything completed");

    console.log(insertionResult);
    console.log("insertion result");
  } else {
    console.log("CV path is undefined. Unable to extract data from PDF.");
    throw new AppError("Upload Only Pdf File", HttpStatus.UNAUTHORIZED);
  }

  return {
    uploadedCVsCount: insertionResult.uploadedCVsCount,
    TotalStudentsCount: insertionResult.TotalStudentsCount,
  };
};

export const postDemoRequest = async(
  demoDetails: demoDetails,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {


let demoInsertionResponse= await CompanyDbRepository.postDemo(demoDetails)
return demoInsertionResponse

};
