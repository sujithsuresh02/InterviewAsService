import { Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import { companyImplementation } from "../../../frameworks/database/Postgres/repositories/company/companyRepostories";
import { CompanysDbInterface } from "../../../application/repositories/companyRepositories/companyRepostories";
import {
  postRequest,
  postRequestWithCVDetails,
  postDemoRequest,
  getAllPlans,
  createSubscription,
  verifyPayment,
  getFullPaymentHistort,
  editProfile,
  getSignupdata,
  uploadedCvCount,
  passwordemailConfirmation,
  resetPassword,
  FeedbackDetails,
} from "../../../application/useCases/company/companies";
import { adminDbImplementation } from "../../../frameworks/database/Postgres/repositories/Admin/adminImplementation";
import { adminDbInterface } from "../../../application/repositories/Admin/adminRepostories";
import {
  addRequestFormData,
  SubscriptionDetails,
} from "../../../types/companyInterfaceTypes";
import { CVDetails } from "../../../types/companyInterfaceTypes";
import { CompanyDbServiceInterface } from "../../../application/services/companyServiceInterface";
import { companyDbServiceImplementation } from "../../../frameworks/services/companyService";
import { companyDbRepository } from "../../../application/repositories/companyRepositoriesInterface";
const companyController = (
  companyDbInterface: CompanysDbInterface,
  companiesDbImplementation: companyImplementation,
  companyServiceInterface: CompanyDbServiceInterface,
  companyServiceImplementation: companyDbServiceImplementation,
  adminRepositoryInterface: adminDbInterface,
  adminRepositoryImplementation: adminDbImplementation
) => {
  const CompanyDbRepository = companyDbInterface(companiesDbImplementation());
  const CompanyServiceRepository = companyServiceInterface(
    companyServiceImplementation()
  );
  const adminDbRepostory = adminRepositoryInterface(
    adminRepositoryImplementation()
  );
  interface MyRequest extends Request {
    id?: String;
  }
  const addRequest = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const companyId: string | undefined = (req as any).id;

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
    const { addrequestId } = req.body;
    const companyId: string = (req as any).id;

    const filetype = req.file?.mimetype;
    const cvPath = req.file?.path;
    const cv = req.file?.originalname;
    const bufferData = req.file?.buffer;
    const cvDetails: CVDetails = {
      path: cvPath || undefined,
      filetype: filetype || undefined,
      Buffer: bufferData,
      companyId,
    };
    const result: any = await postRequestWithCVDetails(
      cvDetails,
      addrequestId,
      CompanyDbRepository,
      CompanyServiceRepository
    );
    
    console.log(result);
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
        result,
      });
    }
  });

  const getFullPlans = asyncHandler(async (req: Request, res: Response) => {
    const fullPlans: any = await getAllPlans(adminDbRepostory);

    if (fullPlans) {
      res.json({
        fullPlans,
      });
    }
  });

  const subscriptions = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const companyid: string | undefined = (req as any).id;
    console.log(companyid, "id");

    const { price, planName, validity, id, interviews } = req.body;

    const subscriptionData: SubscriptionDetails = {
      planName: planName,
      totalAmount: price,
      planId: id,
      validity: validity,
      companyId: companyid,
      numberOfInterviews: interviews,
    };
    const order = await createSubscription(
      subscriptionData,
      CompanyServiceRepository,
      CompanyDbRepository
    );
    if (order.orderId) {
      res.json({
        orderId: order.orderId,
      });
    }
  });

  const capturpayment = asyncHandler(async (req: Request, res: Response) => {
    let orderId = req.params.id;
    console.log(orderId);

    const companyid: string = (req as any).id;
    console.log(companyid);

    const resposne: any = await verifyPayment(
      orderId,
      companyid,
      CompanyServiceRepository,
      CompanyDbRepository
    );
    if (resposne) {
      res.json({
        status: "success",
      });
    }
  });

  const getAllPaymentHistory = asyncHandler(
    async (req: Request, res: Response) => {
      const companyId: string = (req as any).id;

      const paymentHistory = await getFullPaymentHistort(
        companyId,
        CompanyDbRepository
      );
      res.json({
        paymentHistory,
      });
    }
  );
  const profileEdit = asyncHandler(async (req: Request, res: Response) => {
    const companyId: BigInt = (req as any).id;
    console.log(companyId, "id");
    const { username, changeEmail } = req.body;
    const editResponse: boolean = await editProfile(
      username,
      changeEmail,
      companyId,
      CompanyDbRepository
    );
    if (editResponse) {
      res.json({
        message: "Profile Edited Successfully",
      });
    }
  });

  const getCompanyDetails = asyncHandler(
    async (req: Request, res: Response) => {
      const companyId: string = (req as any).id;
      const response = await getSignupdata(companyId, CompanyDbRepository);
      if (response) {
        res.json({
          response,
        });
      }
    }
  );

  const TotalUploadedCv = asyncHandler(async (req: Request, res: Response) => {
    const companyId: string = (req as any).id;

    const response = await uploadedCvCount(companyId, CompanyDbRepository);
    if (response) {
      res.json({
        response,
      });
    }
  });

  const resetPasswordEmailconfirmation = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.body);

      const { name, email } = req.body;
      const response = await passwordemailConfirmation(
        email,
        name,
        CompanyServiceRepository,
        CompanyDbRepository
      );
      if (response) {
        res.json({
          message: "Reset Password Link Has Sent To Respective Email Id",
        });
      }
    }
  );
  const postResetPassword = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.body);
      const companyId: bigint = (req as any).id;

      const { newPassword, oldPassword } = req.body;
      const resposne = resetPassword(
        newPassword,
        oldPassword,
        companyId,
        CompanyDbRepository,
        CompanyServiceRepository
      );
      if (response) {
        res.json({
          message: "Password Reseted Successfully",
        });
      }
    }
  );

  const getFeedbackDetails = asyncHandler(
    async (req: Request, res: Response) => {
      const companyId: string = (req as any).id;

      const response = await FeedbackDetails(companyId, CompanyDbRepository);
      console.log(response);

      if (response) {
        res.json({
          response,
        });
      }
    }
  );
  return {
    addRequest,
    uploadCv,
    postDemo,
    getFullPlans,
    subscriptions,
    capturpayment,
    getAllPaymentHistory,
    profileEdit,
    getCompanyDetails,
    TotalUploadedCv,
    resetPasswordEmailconfirmation,
    postResetPassword,
    getFeedbackDetails,
  };
};
export default companyController;
