import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  adminDbImplementation,
  adminRepositoryImplementation,
} from "../../../frameworks/database/Postgres/repositories/Admin/adminImplementation";
import {
  adminDbInterface,
  adminRepositoryInterface,
} from "../../../application/repositories/Admin/adminRepostories";
import { adminServicesImplementation } from "../../../frameworks/services/adminServices";
import { adminServicesInterface } from "../../../application/services/adminService";
import {
  getFullRequest,
  getFullStudentDetils,
  getFullDemoRequest,
  sendConfirmMail,
} from "../../../application/useCases/Admin/admins";
const adminsController = (
  adminRepositoryInterface: adminDbInterface,
  adminRepositoryImplementation: adminDbImplementation,
  adminServiceInterface: adminServicesInterface,
  adminServiceImplementation: adminServicesImplementation
) => {
  const adminDbRepostory = adminRepositoryInterface(
    adminRepositoryImplementation()
  );
  const adminServiceRepostory = adminServiceInterface(
    adminServiceImplementation()
  );

  const getAllRequest = asyncHandler(async (req: Request, res: Response) => {
    const fullRequest = await getFullRequest(adminDbRepostory);
    res.json({
      fullRequest,
    });
  });

  const getStudentCVDetails = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.params.id);
      console.log("params");

      let id: string = req.params.id;
      const response = await getFullStudentDetils(adminDbRepostory, id);
      res.json({
        response,
      });
    }
  );
  const getDemoRequest = asyncHandler(async (req: Request, res: Response) => {
    const result = await getFullDemoRequest(adminDbRepostory);

    res.json({
      result,
    });
  });

  const sendConfirmationMail = asyncHandler(
    async (req: Request, res: Response) => {
      console.log("controller entered");

      console.log(req.params.email);
      console.log("params");

      let email: string = req.params.email;

      console.log(req.params.email);
      const result = await sendConfirmMail(email, adminServiceRepostory);
      res.json({
        message: "Email has been Sent Successfully",
      });
    }
  );

  return {
    getAllRequest,
    getStudentCVDetails,
    getDemoRequest,
    sendConfirmationMail,
  };
};

export default adminsController;
