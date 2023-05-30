import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { companyImplementation } from "../../../frameworks/database/Postgres/repositories/company/companyRepostories";
import { CompanysDbInterface } from "../../../application/repositories/companyRepositories/companyRepostories";
import { postRequest,postRequestWithCVDetails} from "../../../application/useCases/company/companies";
import { addRequestFormData } from "../../../types/companyInterfaceTypes";
import { CVDetails } from "../../../types/companyInterfaceTypes";
import { CompanyDbServiceInterface } from "../../../application/services/companyServiceInterface";
import { companyDbServiceImplementation } from "../../../frameworks/services/companyService";
const companyController = (
  companyDbInterface: CompanysDbInterface,
  companiesDbImplementation: companyImplementation,
  companyServiceInterface: CompanyDbServiceInterface,
  companyServiceImplementation: companyDbServiceImplementation
) => {
  const CompanyDbRepository = companyDbInterface(companiesDbImplementation());
  const CompanyServiceRepository = companyServiceInterface(
    companyServiceImplementation()
  );
  const addRequest = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.file);
    const {
      jobRole,
      jobDescription,
      optional,
      numberOfVacancy,
      TotalStudentsCount,
      studentName,
    } = req.body;

    console.log("controllers");

    const filetype = req.file?.mimetype;
    const cvPath = req.file?.path;
    const cv = req.file?.originalname;
    const bufferData = req.file?.buffer;


    if(!cvPath){
      const data: addRequestFormData = {
        jobRole,
        jobDescription,
        optional,
        numberOfVacancy,
        TotalStudentsCount,
        studentName,
      };
    let result=   await postRequest(
      data,
      CompanyDbRepository,
      CompanyServiceRepository
    );
      
    }else{

      const cvDetails: CVDetails = {
        path: cvPath || undefined,
        filetype: filetype || undefined,
        Buffer: bufferData,
      };
      const result:any = postRequestWithCVDetails (
        cvDetails,
        CompanyDbRepository,
        CompanyServiceRepository
      );
    console.log(result);
    console.log('nncontroller final');
    
    res.json({
      status: "success",
      message: " Student Details Uploaded Successfully",
    });
    
    }
   

    

 
   
  })
  return {
    addRequest,
  };
};
export default companyController;
