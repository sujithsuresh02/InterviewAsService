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
  Plans,
  editPlans,
  interviewData,
} from "../../../types/adminInterfaceType";
import {
  getFullRequest,
  getFullStudentDetils,
  getFullDemoRequest,
  sendConfirmMail,
  postPlans,
  getAllPlans,
  deletePlans,
  editPlan,
  assignTimeSlot,
  getTimeSlotDetails,
  getIntervieweExpertsRequest,
  emailConfirmation,
  rejectionMail,
  assignInterviewer,
  getFullScheduledInterviews,
  interviewCancellation,
  interviewCancelled,
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
    console.log(fullRequest);

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

  const postSubscriptionPlans = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.body);
      console.log("controllers");

      const { features, interviews, planName, price, validity } = req.body;

      const plansData: Plans = {
        features,
        interviews,
        planName,
        price,
        validity,
      };
      const response = await postPlans(plansData, adminDbRepostory);

      if (response) {
        res.json({
          status: "Success",
          message: "Plan Added Successfully",
        });
      }
    }
  );

  const getFullPlans = asyncHandler(async (req: Request, res: Response) => {
    console.log("cnssnjhl");

    const fullPlans = await getAllPlans(adminDbRepostory);

    if (fullPlans) {
      res.json({
        fullPlans,
      });
    }
  });

  const deletePlan = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.params.id);
    const Id: string = req.params.id;
    const response: any = await deletePlans(Id, adminDbRepostory);

    if (response) {
      res.json({
        id: Id,
        status: "Success",
        message: "Plan Deleted Successfully",
      });
    }
  });

  const editPlans = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);

    const { features, interviews, planName, price, validity, planId } =
      req.body;

    const plansData: editPlans = {
      features,
      interviews,
      planName,
      price,
      validity,
      planId,
    };
    const editedResponse = await editPlan(plansData, adminDbRepostory);
    if (editedResponse) {
      res.json({
        status: "Success",
        message: "Plans Updated  Successfully",
      });
    }
  });

  const assignInterviwer = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.params.id);
    const studentId = req.params.id;
    const response = await assignTimeSlot(studentId, adminDbRepostory);
    if (response) {
      res.json({
        response,
      });
    }
  });

  const getAllTimeSlotDetails = asyncHandler(
    async (req: Request, res: Response) => {
      const response = await getTimeSlotDetails(adminDbRepostory);

      if (response) {
        res.json({
          response,
        });
      }
    }
  );

  const getAllInterviewerRequest = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await getIntervieweExpertsRequest(adminDbRepostory);
      if (result) {
        res.json({
          result,
        });
      }
    }
  );

  const interviewerEmailConfirmation = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.params.email);

      const email = req.params.email;
      const response: any = await emailConfirmation(
        email,
        adminDbRepostory,
        adminServiceRepostory
      );
      if (response) {
        res.json({
          message: "Email Sent Succesfully",
        });
      }
    }
  );

  const sentEmailRejection = asyncHandler(
    async (req: Request, res: Response) => {
      const id: string = req.params.id;
      const email: string = req.params.email;
      const interviewerId = await rejectionMail(
        email,
        id,
        adminServiceRepostory,
        adminDbRepostory
      );
      if (interviewerId) {
        res.json({
          message: "Rejection Mail Successfully Sent",
          interviewerId,
        });
      }
    }
  );
  const postAssignInterviewer = asyncHandler(
    async (req: Request, res: Response) => {
      console.log("fucntion entered");
      console.log();

      console.log(req.body);
      const {
        interviewerId,
        studentId,
        SelectedDate,
        selectedTime,
        interviewerEmail,
        studentEmail,
        TimeslotId,
      } = req.body;
      const date = new Date(SelectedDate);
      console.log(date, "sgschgsdhsd");

      const interviewDetails: interviewData = {
        interviewerId,
        studentId,
        selectedTime,
        SelectedDate,
        TimeslotId,
      };
      const interviewToken = await assignInterviewer(
        interviewDetails,
        interviewerEmail,
        studentEmail,
        adminDbRepostory,
        adminServiceRepostory
      );

      if (interviewToken) {
        res.json({
          message: "Successfully Scheduled Interviewer",
          interviewToken,
        });
      }
    }
  );

  const getAllScheduledInterviews = asyncHandler(
    async (req: Request, res: Response) => {
      const response: any = await getFullScheduledInterviews(adminDbRepostory);
      console.log(response, "resposne");

      if (response) {
        res.json({
          response,
        });
      }
    }
  );

  const cancelInterview = asyncHandler(async (req: Request, res: Response) => {
    const { interviewId } = req.body;
    console.log(interviewId);

    const result: any = await interviewCancellation(
      interviewId,
      adminDbRepostory
    );
    if (result) {
      res.json({
        message: "Interview Is Cancelled Successfully",
      });
    }
  });

  const cancelledInterViews = asyncHandler(
    async (req: Request, res: Response) => {
      const result: any = await interviewCancelled(adminDbRepostory);
      if (result) {
        res.json({
          result,
        });
      }
    }
  );
  return {
    getAllRequest,
    getStudentCVDetails,
    getDemoRequest,
    sendConfirmationMail,
    postSubscriptionPlans,
    getFullPlans,
    deletePlan,
    editPlans,
    assignInterviwer,
    getAllTimeSlotDetails,
    getAllInterviewerRequest,
    interviewerEmailConfirmation,
    sentEmailRejection,
    postAssignInterviewer,
    getAllScheduledInterviews,
    cancelInterview,
    cancelledInterViews,
  };
};

export default adminsController;
