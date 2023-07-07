import express from "express";
 import { companyDbRepositoryImplementation } from "../../database/Postgres/repositories/authImplementation";
import { companyDbRepository } from "../../../application/repositories/authInterface";
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
  router.post ('/sign_in_with_google',controller.loginWithGoogle)
  router.get ('/signup/:token',controller.valiadteSignup)
  router.get ('/validate_interviewer/:token',controller.valiadteInterviewerSignup)
  router.post ('/enter_email',controller.forgotPassword)
  router.post ('/changepassword',controller.changePassword)
  router.get ('/validate_forgotpassword/:token',controller.valiadateForgotpassword)
    return router
}

export default authRouter