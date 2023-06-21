import { companyDbServiceImplementation} from "../../frameworks/services/companyService";
import { SubscriptionDetails } from "../../types/companyInterfaceTypes";
export const companyServiceInterface = (
  companyService: ReturnType<companyDbServiceImplementation>
) => {

    const extractDataFromPdf = (path: string) => {
    return  companyService.extractData(path);
    };

   
    const createSubscribtion = (subscriptionData:SubscriptionDetails) => {
      return  companyService.createSubscription(subscriptionData);
      };
  
      const capturePayment=(orderId:string)=>{
    
        return companyService.verifyPayment(orderId)
      }
    
      const sentEmailConfirmation=(email:string,name:string,Token:string)=>{
    
        return companyService.resetPasswordEmailConfirmation(email,name,Token)
      }

     const encryptPassword = async(password:string) => companyService.encryptPassword(password);
    
      const comparePassword = (password:string, hashedPassword:any) =>
      companyService .comparePassword(password, hashedPassword); 
  
  return{
    extractDataFromPdf,
    createSubscribtion,
    capturePayment,
    sentEmailConfirmation,
    encryptPassword,
    comparePassword
   
  }
};

export  type CompanyDbServiceInterface= typeof companyServiceInterface