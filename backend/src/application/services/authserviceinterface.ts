import {  AuthServiceImple } from "../../frameworks/services/authserviceimplementaion";

export const authServiceInterface=(service:AuthServiceImple) => {
    const encryptPassword = (password:string) => service.encryptPassword(password);


    const comparePassword = (password:string, hashedPassword:any) =>
    service.comparePassword(password, hashedPassword); 

    const generateAcessesToken = (payload:any) => service.generateAcessesToken(payload);
    const generateRefreshTokenToken = (payload:any) => service.generateRefreshTokenToken(payload);
    const verifyAccessToken = (token:any) => service.verifyAccessToken(token)
    const verifyRefereshToken = (token:any) => service.verifyRefreshToken(token)

    return {
      encryptPassword,
      comparePassword,
      generateAcessesToken,
      generateRefreshTokenToken,
      verifyAccessToken,
      verifyRefereshToken
    };

   
}

export type AuthServiceInterface = typeof authServiceInterface