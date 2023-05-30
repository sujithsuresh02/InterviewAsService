import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthServiceInterface } from "../application/services/authserviceinterface";
import { AuthService } from "../frameworks/services/authserviceimplementaion";
import { CompanyDbInterface } from "../application/repositories/companyRepositoriesInterface";
import { companyDbImplementation } from "../frameworks/database/Postgres/repositories/companyRepostoriesImplementation";

import { companyRegister,performLogin } from "../application/useCases/auth";
const authcontroller = (
  authServiceInterface: AuthServiceInterface,
  authServiceImplementation: AuthService,
  CompanyDbInterface: CompanyDbInterface,
  companyDbImplementation: companyDbImplementation
) => {
  const dbRepositoryCompany = CompanyDbInterface(companyDbImplementation());
  const authService = authServiceInterface(authServiceImplementation());

  const registerCompany = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    console.log("req.body");
    const { role, name, email, password } = req.body;
    const signupDetails = {
      role,
      name,
      email,
      password,
    };
     console.log("jnjffjgkfjg");
     
    const result = await companyRegister(
      signupDetails,
      dbRepositoryCompany,
      authService
    );

    res.json({
      status: "success",
      message: " Registered  Successfully",
    });
  });
  const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginDetails = {
      email:email,
      password:password,
    };
     console.log(loginDetails);
     
    let loggedInDetails = await performLogin(
        loginDetails,
       dbRepositoryCompany,
       authService 
      )
      res.json({
        status: "success",
        message: "Role Is Verified",
        loggedInDetails,
      });
  });
  return {
    registerCompany,
    login
  };
};
export default authcontroller;
