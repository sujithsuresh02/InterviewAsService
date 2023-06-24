import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { adminDbInterface } from "../../repositories/Admin/adminRepostories";
import {
  Plans,
  adminFormValues,
  editPlans,
  interviewData,
} from "../../../types/adminInterfaceType";
import { adminServicesInterface } from "../../services/adminService";
import { UUID } from "crypto";

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
  return response;
};

export const postPlans = async (
  planDta: Plans,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbRepostory.postSubscriptionPlans(planDta);
  return response;
};

export const getAllPlans = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbRepostory.getFullPlans();
  return response;
};

export const deletePlans = async (
  id: string,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbRepostory.deletePlans(id);
  return response;
};

export const editPlan = async (
  editedData: editPlans,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbRepostory.editPlan(editedData);
  return response;
};

export const assignTimeSlot = async (
  studentId: string,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = adminDbRepostory.assignInterviewer(studentId);
  return response;
};

export const getTimeSlotDetails = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = adminDbRepostory.getFullTimeSlotData();
  return response;
};

export const getIntervieweExpertsRequest = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const result = adminDbRepostory.getInterviewExpertsRequets();
  return result;
};

export const emailConfirmation = async (
  email: string,
  adminDbRepostory: ReturnType<adminDbInterface>,
  adminDbService: ReturnType<adminServicesInterface>
) => {
  const { Token, name }: any = await adminDbRepostory.getInterviewerToken(
    email
  );
  if (Token && name) {
    const result = adminDbService.sendInterviewerConfirmationMail(
      Token,
      email,
      name
    );
    return result;
  }
};

export const rejectionMail = async (
  email: string,
  id: string,
  adminDbService: ReturnType<adminServicesInterface>,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbService.interviewerRejectionMail(email);
  if (response) {
    const Id = await adminDbRepostory.deleteInterviewerRequest(id);
    return Id;
  }
};

export const assignInterviewer = async (
  interviewDetails: interviewData,
  interviewerEmail: string,
  studentEmail: string,
  adminDbRepostory: ReturnType<adminDbInterface>,
  adminDbService: ReturnType<adminServicesInterface>
) => {
  const interviewToken = await adminDbRepostory.postAssignInterview(
    interviewDetails
  );

  console.log(interviewToken);

  const emailresponse: any =
    await adminDbService.InterviewScheduledConfirmation(
      interviewerEmail,
      studentEmail,
      interviewDetails.SelectedDate,
      interviewDetails.selectedTime,
      interviewToken
    );

  console.log(emailresponse);

  if (emailresponse) {
    console.log(emailresponse);
    console.log(interviewToken);

    return interviewToken;
  }
};

export const getFullScheduledInterviews = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return adminDbRepostory.scheduledInterviews();
};
export const interviewCancellation = async (
  intereviewId: string,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return await adminDbRepostory.cancelInterview(intereviewId);
};

export const interviewCancelled = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return await adminDbRepostory.cancelledInterviews();
};

export const subscriptionCount = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return await adminDbRepostory.daywiseSubscriptionCount();
};

export const monthwiseSubscriptionCount = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return await adminDbRepostory.monthlySubscriptionCount();
};

export const totalClientAndInterviewsCount = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return await adminDbRepostory.totalClientCount();
};

export const getAllSubscriptionHistory = async (
  companyId: string,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return await adminDbRepostory.fullSubscriptionHistory(companyId);
};

export const checkingInterviewStatus = async (
  companyId: string,
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  return await adminDbRepostory.checkInterviewStatus(companyId);
};
