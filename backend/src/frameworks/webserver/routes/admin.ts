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
  router.get("/confirm_mail/:email",controller.sendConfirmationMail);
  router.post("/add_plans",controller.postSubscriptionPlans);
  router.get("/view_plans",controller.getFullPlans);
  router.delete("/delete_plan/:id",controller.deletePlan);
  router.put("/edit_plans",controller.editPlans);
  return router;
};
export default adminRouter;
