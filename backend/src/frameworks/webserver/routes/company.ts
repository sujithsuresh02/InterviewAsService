import express from "express";
import { companiesDbImplementation } from "../../database/Postgres/repositories/company/companyRepostories";
import { companyDbInterface } from "../../../application/repositories/companyRepositories/companyRepostories";
import companyController from "../../../adapters/controllers/company/companyControllers";
import { companyServiceImplementation } from "../../services/companyService";
import { companyServiceInterface } from "../../../application/services/companyServiceInterface";
import { adminRepositoryImplementation } from "../../database/Postgres/repositories/Admin/adminImplementation";
import { adminRepositoryInterface } from "../../../application/repositories/Admin/adminRepostories";
import { upload } from "../../services/multer";
const companyRouter = () => {
  const router = express.Router();

  const controller = companyController(
    companyDbInterface,
    companiesDbImplementation,
    companyServiceInterface,
    companyServiceImplementation,
    adminRepositoryInterface,
    adminRepositoryImplementation
  );

  router.post("/add_request", controller.addRequest);
  router.post("/upload_cv", upload.single("cv"), controller.uploadCv);
  router.get("/plans", controller.getFullPlans);
  router.post("/create-paypal-subscription", controller.subscriptions);
  router.get("/capture-paypal-subscription/:id", controller.capturpayment);
  router.get("/subscription_history", controller.getAllPaymentHistory);
  router.put("/profile", controller.profileEdit);
  router.get("/company_details", controller.getCompanyDetails);
  router.get("/totalcv_uploaded", controller.TotalUploadedCv);
  router.post("/send_confirmationmail", controller.resetPasswordEmailconfirmation);
  router.put("/reset_password", controller.postResetPassword);
  router.get("/feedback", controller.getFeedbackDetails);

  return router;
};
export default companyRouter;
