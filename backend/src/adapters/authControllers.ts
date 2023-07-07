import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthServiceInterface } from "../application/services/authserviceinterface";
import { AuthService } from "../frameworks/services/authserviceimplementaion";
import { CompanyDbInterface } from "../application/repositories/authInterface";
import { companyDbImplementation } from "../frameworks/database/Postgres/repositories/authImplementation";
import { GoogleUserInteface } from "../types/authinterface";
import {
  companyRegister,
  performLogin,
  googleUserLogin,
  signupPageValidation,
  forgottingPassword,
  interviewerSignupValidation,
  changingPasssword,
  forgotPasswordValidation,
} from "../application/useCases/auth";
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

    if (result) {
      res.json({
        status: "success",
        message: " Registered  Successfully",
        result,
      });
    }
  });
  const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginDetails = {
      email: email,
      password: password,
    };
    console.log(loginDetails);

    let loggedInDetails = await performLogin(
      loginDetails,
      dbRepositoryCompany,
      authService
    );
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
      status: "success",
      message: "user verified",
      token,
    });
  });

  const valiadteSignup = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token;
    const validationToken: any = await signupPageValidation(
      token,
      dbRepositoryCompany
    );
    console.log(validationToken, "validation token");
    res.json({
      validationToken: validationToken,
    });
  });

  const valiadteInterviewerSignup = asyncHandler(
    async (req: Request, res: Response) => {
      const token = req.params.token;
      const validationToken: any = await interviewerSignupValidation(
        token,
        dbRepositoryCompany
      );
      console.log(validationToken, "validation token");
      res.json({
        validationToken: validationToken,
      });
    }
  );

  const forgotPassword = async (req: Request, res: Response) => {
    console.log(req.body);

    const { email } = req.body;
    console.log(email, "from controller");

    const response: any = await forgottingPassword(
      email,
      dbRepositoryCompany,
      authService
    );
    if (response === true) {
      res.json({
        message:
          "For Changing The Password The Link Has Sent To Registread Email  Successfully",
      });
    }
  };

  const changePassword = async (req: Request, res: Response) => {
    console.log(req.body);
    const { newPassword, email, role } = req.body;

    const response = await changingPasssword(
      newPassword,
      email,
      role,
      dbRepositoryCompany,
      authService
    );
    if (response) {
      res.json({
        message: "Your Password Is Changed Successfully ",
      });
    }
  };

  const valiadateForgotpassword = async (req: Request, res: Response) => {
    const token = req.params.token;

    const response = await forgotPasswordValidation(token, dbRepositoryCompany);
    console.log(response);
    if (response) {
      res.json({
        response,
      });
    }
  };

  return {
    registerCompany,
    login,
    loginWithGoogle,
    valiadteSignup,
    valiadteInterviewerSignup,
    forgotPassword,
    changePassword,
    valiadateForgotpassword,
  };
};
export default authcontroller;
