import bcrypt, { compare } from 'bcryptjs';
 import Jwt  from 'jsonwebtoken';
 import configKeys from '../../config';
export const  authServiceImplementation=()=> {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  
  const comparePassword=(password:string,hashedPassword:any)=>{
    
    return bcrypt.compare(password,hashedPassword)
 }


 const generateAcessesToken=(payload:any)=>{
  const acessesToken = Jwt.sign(payload, configKeys.JWT_SECRET, {
      expiresIn: "1d",
  });
  return acessesToken
}
const generateRefreshTokenToken=(payload:any)=>{
  const refreshToken = Jwt.sign(payload, configKeys.JWT_SECRET, {
      expiresIn: "7d",
  });
  return refreshToken
}
  return {
    encryptPassword,
    comparePassword,
    generateAcessesToken,
    generateRefreshTokenToken
  };
}

export type AuthService = typeof authServiceImplementation 

export type AuthServiceImple = ReturnType<AuthService>