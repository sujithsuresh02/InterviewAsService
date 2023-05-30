import express from "express";
import { companiesDbImplementation } from "../../database/Postgres/repositories/company/companyRepostories";
import { companyDbInterface } from "../../../application/repositories/companyRepositories/companyRepostories";
import companyController from "../../../adapters/controllers/company/companyControllers";
import { companyServiceImplementation } from "../../services/companyService";
import { companyServiceInterface } from "../../../application/services/companyServiceInterface";
import { upload } from "../../services/multer";
const companyRouter = () => {
  const router = express.Router();

  const controller =companyController(
    companyDbInterface,
    companiesDbImplementation,
    companyServiceInterface,
    companyServiceImplementation,
 )

 
   router.post("/add_request",upload.single('cv'), controller.addRequest)
  return router;
};
export default companyRouter;
