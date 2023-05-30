
import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appError";
import { AuthServiceInterface } from "../services/authserviceinterface";
import { CompanyDbInterface } from "../repositories/companyRepositoriesInterface";
export const companyRegister = async (
  signupDetails: {
    role:string
    name: string;
    email: string;
    password: string;
  },
  companyRepository: ReturnType<CompanyDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {  
 
  // signupDetails.email = signupDetails.email.toLowerCase();
  // const isExistingEmail = await companyRepository.getCompanyByEmail(signupDetails.email);
  // if (isExistingEmail) {
  //   console.log("existing email: ")
  //   throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
  // }

  if(signupDetails.password.length<=3){
    console.log("password length is 0: ")
    throw new AppError("Password Empty", HttpStatus.BAD_REQUEST);
  }
  signupDetails.password = await authService.encryptPassword(signupDetails.password);
  const registerResponse = await companyRepository.registerCompany (signupDetails);
  console.log("controllers usecase ")
  return {
    registerResponse
  };
}

  export const performLogin = async (
    loginDetails: {
    email:any,
    password:any
   },
    companyRepository: ReturnType<CompanyDbInterface>,
  authService: ReturnType<AuthServiceInterface>
  ) => {

    const signupedperson:any= await companyRepository.getCompanyByEmail(loginDetails.email)
    if(!signupedperson){
      throw new AppError("You Are Entered Incorrect Email",HttpStatus.UNAUTHORIZED)
    }
    let matchedAccount = null;
    for (const account of signupedperson) {
      const passwordMatched = await authService.comparePassword(loginDetails.password, account.password);
      if (passwordMatched) {
        const { password, ...accountWithoutPassword } = account;
        matchedAccount = accountWithoutPassword;
        break;
      }
    }
    if(!matchedAccount){
      throw new AppError("Sorry, your password was incorrect. Please check your password",HttpStatus.UNAUTHORIZED,)
    }
     console.log(matchedAccount);
     
      
    // return matchedAccount
   
    const payload = {
      id: matchedAccount.id,
      name: matchedAccount.name
    };
    
    const accessToken = authService.generateAcessesToken (payload)
    const refreshToken = authService.generateRefreshTokenToken (payload)

     console.log(accessToken);
     console.log('usecase');
     console.log(refreshToken);

    return {matchedAccount,refreshToken ,accessToken}
  };
  