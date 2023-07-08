import { Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import { becomeexpertsDbImplementation } from "../../../frameworks/database/Postgres/repositories/Landingpage/becomeexpertsImplementation";
import { becomeInterviewexpertsDbInterface } from "../../../application/repositories/Landingpage/BecomeExpertInterface";
import {
  interviewExperts,
  authenticateInterviewToken,
} from "../../../application/useCases/Landingpage/becomeExperts";
import { FormValues } from "../../../types/interviewExperts";
const interviewexpertsController = (
  becomeExpertInterface: becomeInterviewexpertsDbInterface,
  becomeExpertsImplementation: becomeexpertsDbImplementation
) => {
  const interviewExpertsDbRepository = becomeExpertInterface(
    becomeExpertsImplementation()
  );

  const postInterviewExpert = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.body);

      console.log(req.file);
      const {
        fullName,
        phoneNumber,
        email,
        linkedIn,
        currentEmployer,
        experience,
        graduationYear,
        domainExpertise,
        message,
      } = req.body;

      console.log(req.file?.filename);
      const cvFile: string | undefined = req.file?.filename;
      const formData: FormValues = {
        fullName,
        phoneNumber,
        email,
        linkedIn,
        cvFile: cvFile,
        currentEmployer,
        experience,
        graduationYear,
        domainExpertise,
        message,
      };
      const Tokens: any = await interviewExperts(
        formData,
        interviewExpertsDbRepository
      );
      console.log(Tokens);

        res.json({
          message: "Form Submitted Successfully!!",
          Tokens: Tokens,
          status: "success",
        });
    }
  );

  const validateInterviewToken = asyncHandler(
    async (req: Request, res: Response) => {
      const interviewToken = req.params.token;
      console.log(interviewToken);
      
      const resposne = await authenticateInterviewToken(
        interviewToken,
        interviewExpertsDbRepository
      );

      if (response) {
        res.json({
          interviewtoken: resposne,
        });
      }
    }
  );

  return {
    postInterviewExpert,
    validateInterviewToken,
  };
};

export default interviewexpertsController;
