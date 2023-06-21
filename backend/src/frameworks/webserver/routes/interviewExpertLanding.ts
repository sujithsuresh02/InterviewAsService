import express from "express";
import interviewexpertsController from "../../../adapters/controllers/Landingpage/Becomeinterviewexperts";
import { interviewExpertUpload } from "../../services/multer";
import { becomeExpertsImplementation } from "../../database/Postgres/repositories/Landingpage/becomeexpertsImplementation";
import { becomeexpertsDbInterface } from "../../../application/repositories/Landingpage/BecomeExpertInterface";
const interviewexpertLandingRouter = () => {
  const router = express.Router();

  const controller = interviewexpertsController(
 
    becomeexpertsDbInterface,
    becomeExpertsImplementation
 )

 
   router.post("/become_interviewexpert",interviewExpertUpload.single('cvFile'),controller.postInterviewExpert)
   router.get("/validate_interviewToken/:token",controller.validateInterviewToken)
   

  return router;
};
export default interviewexpertLandingRouter;
