// import { companyDbImplementation } from "../../frameworks/database/Postgres/repositories/companyRepostoriesImplementation";
import { UUID } from "crypto";
import { companyImplementation } from "../../../frameworks/database/Postgres/repositories/company/companyRepostories";
import { SubscriptionDetails, addRequestFormData } from "../../../types/companyInterfaceTypes";
import { studentDetails,demoDetails } from "../../../types/companyInterfaceTypes";

export const companyDbInterface= (
  implementationRepository: ReturnType<companyImplementation>
) => {
  const addRequests = async (requestData:addRequestFormData ) => {
    console.log(addRequests);
    console.log("this is interface")

    return await implementationRepository.postRequest(requestData);
  };

  const insertStudentDetails=(studentDetails:studentDetails,addRequestId:BigInt,companyId:string)=>{
    return implementationRepository.createStudentDetails(studentDetails,addRequestId,companyId)
  }

  const postDemo=(demoDetails:demoDetails)=>{
    console.log('interface');
    
    return implementationRepository.postDemoRequest(demoDetails)
  }


  const saveOrderToDatabase=(subscriptionData:SubscriptionDetails,startDate:number,endDate:number,orderId:number)=>{
    console.log('interface');
    
    return implementationRepository.saveOrderToDatabase(subscriptionData,startDate,endDate,orderId)
  }

  const createPayment=(orderId:string,paymentId:string,companyId:string )=>{
    console.log('interface');
    
    return implementationRepository.createPayment(orderId,paymentId,companyId)
  }

  const getAllPaymentHistory=(companyId:string )=>{
    
    return implementationRepository.getPaymentHistort(companyId)
  }
  const profileEdit=( username:string,changeEmail:string,companyId:BigInt)=>{
    
    return implementationRepository.editProfileDetails(username,changeEmail,companyId)
  }

  const signUpData=(companyId:string)=>{
    
    return implementationRepository.getSignupData(companyId)
  }
  const totalCvUploaded=(companyId:string)=>{
    
    return implementationRepository.totalNumberCvUploaded(companyId)
  }
  const getvalidationToken=(email:string)=>{
    
    return implementationRepository.retrieveValidationToken(email)
  }
  const postResetPassword=(newPassword:any,compantId:bigint)=>{
    
    return implementationRepository.resetPassword(newPassword,compantId)
  }
  const CompanyPassword=(compantId:bigint)=>{
    
    return implementationRepository.getCompanyPassword(compantId)
  }
  const getFeedbackDetails=(companyId:string)=>{
    
    return implementationRepository.getInterviewFeedbackDetails(companyId)
  }

  return {
    addRequests,
    insertStudentDetails,
    postDemo,
    saveOrderToDatabase,
    createPayment,
    getAllPaymentHistory,
    profileEdit,
    signUpData,
    totalCvUploaded,
    getvalidationToken,
    postResetPassword,
    CompanyPassword,
    getFeedbackDetails
    
  };


};
export type CompanysDbInterface = typeof companyDbInterface;
