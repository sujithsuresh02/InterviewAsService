import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { companyImplementation } from "../../../frameworks/database/Postgres/repositories/company/companyRepostories";
import { CompanysDbInterface } from "../../../application/repositories/companyRepositories/companyRepostories";
import {
  postRequest,
  postRequestWithCVDetails,
  postDemoRequest,
} from "../../../application/useCases/company/companies";
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
  interface MyRequest extends Request {
    id?: String;
  }
  const addRequest = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const companyId: string | undefined = (req as any).id;
    console.log(companyId);

    const {
      jobRole,
      jobDescription,
      optional,
      numberOfVacancy,
      TotalStudentsCount,
    } = req.body;

    console.log("controllers");

    const data: addRequestFormData = {
      jobRole,
      jobDescription,
      optional,
      numberOfVacancy,
      TotalStudentsCount,
      companyId,
    };
    let result = await postRequest(
      data,
      CompanyDbRepository,
      CompanyServiceRepository
    );
    console.log(result);
    console.log("final");

    res.json({
      result,
    });
  });

  const uploadCv = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.file);
    console.log(req);
    const { addrequestId } = req.body;
    const filetype = req.file?.mimetype;
    const cvPath = req.file?.path;
    const cv = req.file?.originalname;
    const bufferData = req.file?.buffer;
    const cvDetails: CVDetails = {
      path: cvPath || undefined,
      filetype: filetype || undefined,
      Buffer: bufferData,
    };
    const result: any = await postRequestWithCVDetails(
      cvDetails,
      addrequestId,
      CompanyDbRepository,
      CompanyServiceRepository
    );

    res.json({
      TotalUploadedCv: result,
    });
    console.log("nncontroller final");
  });

  const postDemo = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);

    const result = await postDemoRequest(req.body, CompanyDbRepository);
    if (result) {
      res.json({
        message: "Form Submitted Successfully",
        result
      });
    }
  });

  return {
    addRequest,
    uploadCv,
    postDemo,
  };
};
export default companyController;
