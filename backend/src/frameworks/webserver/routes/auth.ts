import express from "express";
 import { companyDbRepositoryImplementation } from "../../database/Postgres/repositories/companyRepostoriesImplementation";
import { companyDbRepository } from "../../../application/repositories/companyRepositoriesInterface";
import { authServiceImplementation } from "../../services/authserviceimplementaion";
import { authServiceInterface } from "../../../application/services/authserviceinterface";
 import authcontroller from "../../../adapters/authControllers";
const authRouter=()=>{
    const router = express.Router();
 const controller =authcontroller(
    authServiceInterface,
    authServiceImplementation,
    companyDbRepository,
    companyDbRepositoryImplementation
 )
  
 router.post('/signup',controller.registerCompany)
  router.post ('/login',controller.login)

    return router
}

export default authRouter