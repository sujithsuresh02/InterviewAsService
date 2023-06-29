import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthServiceInterface } from "../application/services/authserviceinterface";
import { AuthService } from "../frameworks/services/authserviceimplementaion";
import { CompanyDbInterface } from "../application/repositories/companyRepositoriesInterface";
import { companyDbImplementation } from "../frameworks/database/Postgres/repositories/companyRepostoriesImplementation";
import { GoogleUserInteface } from "../types/authinterface";
import { companyRegister,performLogin ,googleUserLogin,signupPageValidation} from "../application/useCases/auth";
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

     if(result){
    res.json({
      status: "success",
      message: " Registered  Successfully",
      result
    });
  }
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


  const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    
    const userDetails: GoogleUserInteface | any = req.body;
    const user: GoogleUserInteface = {
      name: userDetails?.currentUser?.displayName,
      email: userDetails?.currentUser?.email,
    };
    console.log(user);
    
    const token = await googleUserLogin(user, dbRepositoryCompany, authService);
    res.json({
      status: 'success',
      message: 'user verified',
      token,
    });
  })

  const valiadteSignup = asyncHandler(async (req: Request, res: Response) => {

     const token= req.params.token
     const validationToken:any = signupPageValidation(token,dbRepositoryCompany)
     res.json({
      validationToken:validationToken
     })
  })
   
  return {
    registerCompany,
    login,
    loginWithGoogle,
    valiadteSignup
  };
};
export default authcontroller;
