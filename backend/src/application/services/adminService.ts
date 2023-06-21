import { adminServicesImplementation } from "../../frameworks/services/adminServices";

export const adminServiceInterface = (
  Service: ReturnType<adminServicesImplementation>
) => {
  console.log("password");
  const encryptPassword = async (password: string) =>
    Service.encryptPassword(password);

  const comparePassword = (password: string, hashedPassword: any) =>
    Service.comparePassword(password, hashedPassword);

  const generateAcessesToken = (payload: any) =>
    Service.generateAcessesToken(payload);
  const generateRefreshTokenToken = (payload: any) =>
    Service.generateRefreshTokenToken(payload);
  const sendConfirmationMail = (email: string) => {
    return Service.sendEmailConfirmation(email);
  };
  const sendInterviewerConfirmationMail = (
    Token: any,
    email: string,
    name: any
  ) => {
    return Service.interviewerConfirmationEmail(Token, email, name);
  };
  const interviewerRejectionMail = (email: string) => {
    return Service.rejectionEmail(email);
  };
  const InterviewScheduledConfirmation = (interviewerEmail:string,studentEmail:string,Date:string,Time:string,interviewToken:string) => {
    return Service.InterviewConfirmationMail(interviewerEmail,studentEmail,Date,Time,interviewToken);
  };

  return {
    encryptPassword,
    comparePassword,
    generateAcessesToken,
    generateRefreshTokenToken,
    sendConfirmationMail,
    sendInterviewerConfirmationMail,
    interviewerRejectionMail,
    InterviewScheduledConfirmation
  };
};

export type adminServicesInterface = typeof adminServiceInterface;
