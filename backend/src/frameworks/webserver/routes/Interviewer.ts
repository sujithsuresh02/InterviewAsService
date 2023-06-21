import express from "express";
import { interviwerDbInterface } from "../../../application/repositories/Interviewer/InterviewerInterface";
import { interviwerDbImplementation } from "../../database/Postgres/repositories/Interviewer/InterviewerImplementation";
import interviwerController from "../../../adapters/controllers/Interviewer/InterviewerController";
const interviwerRouter = () => {
  const router = express.Router();

  const controller = interviwerController(
    interviwerDbInterface,
    interviwerDbImplementation
  );

  router.post("/addtime_slot", controller.addAvailableTimeSlot);
  router.get("/view_timeslots", controller.getallTimeslots);
  router.get("/view_interviews", controller.getAllSchedulledInterviews);
  router.put("/add_feedback", controller.updateFeedback);
  router.get("/daily_interviews", controller.datewiseInterviewsListing);
  router.get("/completed_Interviews", controller.completedInterviews);
  router.get("/interviewer_Details", controller.getIntreviewerData);
  router.put("/edit_profile", controller.editProfile);
  
  return router;
};
export default interviwerRouter;
