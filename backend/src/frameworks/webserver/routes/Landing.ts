import express from "express";
import { companiesDbImplementation } from "../../database/Postgres/repositories/company/companyRepostories";
import { companyDbInterface } from "../../../application/repositories/companyRepositories/companyRepostories";
import companyController from "../../../adapters/controllers/company/companyControllers";
import { companyServiceImplementation } from "../../services/companyService";
import { companyServiceInterface } from "../../../application/services/companyServiceInterface";
import { adminRepositoryImplementation } from "../../database/Postgres/repositories/Admin/adminImplementation";
import { adminRepositoryInterface } from "../../../application/repositories/Admin/adminRepostories";
adminRepositoryImplementation;
const LandingRouter = () => {
  const router = express.Router();

  const controller = companyController(
    companyDbInterface,
    companiesDbImplementation,
    companyServiceInterface,
    companyServiceImplementation,
    adminRepositoryInterface,
    adminRepositoryImplementation
  );

  router.post("/demo", controller.postDemo);
  return router;
};
export default LandingRouter;
