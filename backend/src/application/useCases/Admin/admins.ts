import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { adminDbInterface } from "../../repositories/Admin/adminRepostories";
import { Plans, adminFormValues, editPlans } from "../../../types/adminInterfaceType";
import { adminServicesInterface } from "../../services/adminService";

export const adminsRegister = async (
  data: adminFormValues,
  adminDbRepostory: ReturnType<adminDbInterface>,
  adminDbService: ReturnType<adminServicesInterface>
) => {
  if (data.password.length <= 3) {
    console.log("password length is 0: ");
    throw new AppError(
      "Password Must Be Eight Chatacter",
      HttpStatus.BAD_REQUEST
    );
  }
  console.log(data);

  data.password = await adminDbService.encryptPassword(data.password);
  console.log("password hashed ");

  let resposne = await adminDbRepostory.registerAdmin(data);
  console.log("response");

  console.log(resposne);
  return true;
};

export const performAdminLogin = async (
  loginDetails: {
    email: string;
    password: string;
  },
  adminDbRepostory: ReturnType<adminDbInterface>,
  adminDbService: ReturnType<adminServicesInterface>
) => {
  const signupedperson: any = await adminDbRepostory.getCompanyByEmail(
    loginDetails.email
  );
  if (!signupedperson) {
    throw new AppError(
      "You Are Entered Incorrect Email",
      HttpStatus.UNAUTHORIZED
    );
  }
  let matchedAccount = null;
  for (const account of signupedperson) {
    const passwordMatched = await adminDbService.comparePassword(
      loginDetails.password,
      account.password
    );
    if (passwordMatched) {
      const { password, ...accountWithoutPassword } = account;
      matchedAccount = accountWithoutPassword;
      break;
    }
  }
  if (!matchedAccount) {
    throw new AppError(
      "Sorry, your password was incorrect. Please check your password",
      HttpStatus.UNAUTHORIZED
    );
  }
  console.log(matchedAccount);

  console.log("matched");

  // return matchedAccount

  const payload = {
    id: matchedAccount.id,
    name: matchedAccount.name,
    role: "admin",
  };

  const accessToken = adminDbService.generateAcessesToken(payload);
  const refreshToken = adminDbService.generateRefreshTokenToken(payload);

  console.log(accessToken);
  console.log("usecase");
  console.log(refreshToken);

  return { matchedAccount, refreshToken, accessToken };
};

export const getFullRequest = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbRepostory.getAllRequest();
  return response;
};

export const getFullStudentDetils = async (
  adminDbRepostory: ReturnType<adminDbInterface>,
  id: string
) => {
  const response = await adminDbRepostory.getStudentDetails(id);
  return response;
};

export const getFullDemoRequest = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbRepostory.getFullDemoRequest();
  console.log(response);
  console.log("from usecase");

  return response;
};

export const sendConfirmMail = async (
  email: string,
  adminDbService: ReturnType<adminServicesInterface>
) => {
  const response = await adminDbService.sendConfirmationMail(email);
  return response
};

export const postPlans=async(planDta:Plans,adminDbRepostory: ReturnType<adminDbInterface>)=>{


  const response= await adminDbRepostory.postSubscriptionPlans(planDta)
 return response
}


export const getAllPlans=async(adminDbRepostory: ReturnType<adminDbInterface>)=>{

   const response=await adminDbRepostory.getFullPlans()
  return response
}


export const deletePlans=async(id:string,adminDbRepostory: ReturnType<adminDbInterface>)=>{

 const response=await adminDbRepostory.deletePlans(id)
 return response
}

export const editPlan=async(editedData:editPlans,adminDbRepostory: ReturnType<adminDbInterface>)=>{

 const response= await adminDbRepostory.editPlan(editedData)
return response
}
