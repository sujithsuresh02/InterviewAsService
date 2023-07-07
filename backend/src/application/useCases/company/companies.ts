import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import {
  addRequestFormData,
  SubscriptionDetails,
} from "../../../types/companyInterfaceTypes";
import { CVDetails } from "../../../types/companyInterfaceTypes";
import { CompanysDbInterface } from "../../repositories/companyRepositories/companyRepostories";
import { CompanyDbServiceInterface } from "../../services/companyServiceInterface";
import { demoDetails } from "../../../types/companyInterfaceTypes";
import { adminDbInterface } from "../../../application/repositories/Admin/adminRepostories";
import { response } from "express";
import { companyDbRepository } from "../../repositories/authInterface";
import { companyServiceImplementation } from "../../../frameworks/services/companyService";

export const postRequest = async (
  data: addRequestFormData,
  CompanyDbRepository: ReturnType<CompanysDbInterface>,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>
) => {
  let addRequestId = await CompanyDbRepository.addRequests(data);
  console.log(addRequestId);
  console.log("first");

  console.log("response of cv details inserted ");
  return { addRequestId };
};

export const postRequestWithCVDetails = async (
  cvDetails: CVDetails,
  addRequestId: BigInt,
  CompanyDbRepository: ReturnType<CompanysDbInterface>,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>
): Promise<any> => {
  let insertionResult: any;

  if (cvDetails.path) {
    const response = await CompanyServiceRepository.extractDataFromPdf(
      cvDetails.path
    );
    const StudentDetails = await JSON.parse(response);
    console.log(addRequestId);

    insertionResult = await CompanyDbRepository.insertStudentDetails(
      StudentDetails,
      addRequestId,
      cvDetails.companyId
    );
    console.log("everything completed");

    console.log(insertionResult);
    console.log("insertion result");
  } else {
    console.log("CV path is undefined. Unable to extract data from PDF.");
    throw new AppError("Upload Only Pdf File", HttpStatus.UNAUTHORIZED);
  }

  return {
    uploadedCVsCount: insertionResult.uploadedCVsCount,
    TotalStudentsCount: insertionResult.TotalStudentsCount,
    jobRole: insertionResult.jobrole,
  };
};

export const postDemoRequest = async (
  demoDetails: demoDetails,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  let demoInsertionResponse = await CompanyDbRepository.postDemo(demoDetails);
  return demoInsertionResponse;
};

export const getAllPlans = async (
  adminDbRepostory: ReturnType<adminDbInterface>
) => {
  const response = await adminDbRepostory.getFullPlans();
  return response;
};

export const createSubscription = async (
  subscriptionDetails: SubscriptionDetails,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  const response: any = await CompanyServiceRepository.createSubscribtion(
    subscriptionDetails
  );
  console.log(response);
  const insertedResult = await CompanyDbRepository.saveOrderToDatabase(
    subscriptionDetails,
    response?.startDate,
    response?.endDate,
    response?.orderId
  );
  return response;
};

export const verifyPayment = async (
  orderId: string,
  companyId: string,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  console.log("enter usecase");

  const paymentId = await CompanyServiceRepository.capturePayment(orderId);
  const result = await CompanyDbRepository.createPayment(
    orderId,
    paymentId,
    companyId
  );
  return result;
};

export const getFullPaymentHistort = async (
  companyId: string,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  return await CompanyDbRepository.getAllPaymentHistory(companyId);
};

export const editProfile = async (
  username: string,
  changeEmail: string,
  companyid: BigInt,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  const response = await CompanyDbRepository.profileEdit(
    username,
    changeEmail,
    companyid
  );
  return true;
};

export const getSignupdata = async (
  companyId: string,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  return await CompanyDbRepository.signUpData(companyId);
};

export const uploadedCvCount = async (
  companyId: string,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  const response = await CompanyDbRepository.totalCvUploaded(companyId);
  return response;
};

export const passwordemailConfirmation = async (
  email: string,
  name: string,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  const Token = await CompanyDbRepository.getvalidationToken(email);
  if (Token) {
    const response = CompanyServiceRepository.sentEmailConfirmation(
      email,
      name,
      Token
    );
    return response;
  }
};

export const resetPassword = async (
  newPassword: string,
  oldPassword: string,
  compantId: bigint,
  CompanyDbRepository: ReturnType<CompanysDbInterface>,
  CompanyServiceRepository: ReturnType<CompanyDbServiceInterface>
) => {
  const hashedOldPassword = await CompanyDbRepository.CompanyPassword(
    compantId
  );
  const passwordMatched = await CompanyServiceRepository.comparePassword(
    oldPassword,
    hashedOldPassword
  );
  console.log(passwordMatched);

  if (passwordMatched) {
    const hashedNewpassword = await CompanyServiceRepository.encryptPassword(
      newPassword
    );
    const response = await CompanyDbRepository.postResetPassword(
      hashedNewpassword,
      compantId
    );
    if (response) {
      return response;
    }
  }
};

export const FeedbackDetails = async (
  companyId: string,
  CompanyDbRepository: ReturnType<CompanysDbInterface>
) => {
  return CompanyDbRepository.getFeedbackDetails(companyId);
};
