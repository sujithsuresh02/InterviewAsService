import { companyDbImplementation } from "../../frameworks/database/Postgres/repositories/authImplementation";

export const companyDbRepository = (
  repository: ReturnType<companyDbImplementation>
) => {
  const registerCompany = async (signupDetails: {
    role?:string|any;
    name: string;
    email: string;
    password?: string| null;
  }) => {
    console.log("mm");
    console.log(signupDetails);
    console.log("this is interface")

    return await repository.registerCompany(signupDetails);
  };

  const getByEmail= async (email: string) =>
  await repository.getByEmail (email);

 const getByEmailSignup=async(email:string,role:string)=>{
 return await repository.getByEmailSignup (email,role);
 }
 const signupvaliadtion = (token:any) => repository.validateSignupPage(token)

 const validateInterviewerSignup = (token:any) => repository.interviewerSignupValidation(token)

const changePassword = (newPassword:string,email:string,role:string) => repository.changingPassword(newPassword,email,role)
const validateForgotPassword = (token:string) => repository.forgotPasswordValidation(token)

  return {
    registerCompany,
    getByEmail,
    getByEmailSignup,
    signupvaliadtion,
    validateInterviewerSignup,
    changePassword,
    validateForgotPassword

  };
};
export type CompanyDbInterface = typeof companyDbRepository;
