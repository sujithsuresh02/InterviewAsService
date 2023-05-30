import {  AuthServiceImple } from "../../frameworks/services/authserviceimplementaion";

export const authServiceInterface=(service:AuthServiceImple) => {
    const encryptPassword = (password:string) => service.encryptPassword(password);


    const comparePassword = (password:string, hashedPassword:any) =>
    service.comparePassword(password, hashedPassword); 

    const generateAcessesToken = (payload:any) => service.generateAcessesToken(payload);
    const generateRefreshTokenToken = (payload:any) => service.generateRefreshTokenToken(payload);
    return {
      encryptPassword,
      comparePassword,
      generateAcessesToken,
      generateRefreshTokenToken
    };

   
}

export type AuthServiceInterface = typeof authServiceInterface