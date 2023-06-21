import express from "express";
import adminAuthController from "../../../adapters/controllers/Admin/authController";
import { adminRepositoryImplementation } from "../../database/Postgres/repositories/Admin/adminImplementation";
import { adminRepositoryInterface } from "../../../application/repositories/Admin/adminRepostories";
import { adminServiceImplementation } from "../../services/adminServices";
import { adminServiceInterface } from "../../../application/services/adminService";
import adminsController from "../../../adapters/controllers/Admin/adminControllers";
const adminRouter = () => {
  const controller = adminsController(
    adminRepositoryInterface,
    adminRepositoryImplementation,
    adminServiceInterface,
    adminServiceImplementation
  );

  const router = express.Router();
  router.get("/view_request", controller.getAllRequest);
  router.get("/student_details/:id", controller.getStudentCVDetails);
  router.get("/view_demo", controller.getDemoRequest);
  router.get("/confirm_mail/:email", controller.sendConfirmationMail);
  router.post("/add_plans", controller.postSubscriptionPlans);
  router.get("/view_plans", controller.getFullPlans);
  router.delete("/delete_plan/:id", controller.deletePlan);
  router.put("/edit_plans", controller.editPlans);
  router.get("/addtime_slot/:id", controller.assignInterviwer);
  router.get("/timeslot_details", controller.getAllTimeSlotDetails);
  router.get("/interview_experts", controller.getAllInterviewerRequest);
  router.get(
    "/interviewer_emailconfirmation/:email",
    controller.interviewerEmailConfirmation
  );
  router.delete(
    "/sent_rejectionmail/:email/:id",
    controller.sentEmailRejection
  );
  router.post("/assign_interview", controller.postAssignInterviewer);
  router.get("/scheduled_interviews", controller.getAllScheduledInterviews);
  router.post("/cancel_Interview", controller.cancelInterview);
  router.get("/cancelled_Interviews", controller.cancelledInterViews);

  return router;
};
export default adminRouter;
