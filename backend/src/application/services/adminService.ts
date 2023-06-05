import { adminServicesImplementation } from "../../frameworks/services/adminServices";

  export  const adminServiceInterface=(Service:ReturnType< adminServicesImplementation>)=>{

    console.log("password");
    const encryptPassword = async(password:string) => Service.encryptPassword(password);
    
    const comparePassword = (password:string, hashedPassword:any) =>
    Service .comparePassword(password, hashedPassword); 

    const generateAcessesToken = (payload:any) => Service.generateAcessesToken(payload);
    const generateRefreshTokenToken = (payload:any) => Service.generateRefreshTokenToken(payload);
    const sendConfirmationMail=(email:string)=>{
      return Service.sendEmailConfirmation(email)
    }

return{
    encryptPassword,
    comparePassword,
    generateAcessesToken,
    generateRefreshTokenToken,
    sendConfirmationMail
}


  }

export type adminServicesInterface = typeof adminServiceInterface 
