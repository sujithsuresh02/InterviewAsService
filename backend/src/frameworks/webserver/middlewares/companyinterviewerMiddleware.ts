import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { authServiceInterface } from "../../../application/services/authserviceinterface";
import { authServiceImplementation } from "../../services/authserviceimplementaion";

const authservicemiddleware = authServiceInterface(authServiceImplementation());

interface MyRequest extends Request {
  name?: string; 
  role?:String,
  id?:String

}
let decoded:any
export const authenticateToken = (
  req: MyRequest, 
  res: Response,
  next: NextFunction
): void => {
  console.log("hi");
  console.log(req.headers);

  const authHeader: any = req.headers.authorization;
  console.log(authHeader);
  console.log("auth header");

  if (!authHeader) {
    console.log("Access token not found");
    return;
  }

  const accessToken = authHeader.split("access_token=")[1].split(",")[0];
  const refreshToken = authHeader.split("refresh_token=")[1].split(",")[0];

  console.log(accessToken);
  console.log("access token");
  console.log(refreshToken);
  console.log("refresh token");

  if (!accessToken) {
    console.log("Access token not found");
    return;
  }

   decoded = authservicemiddleware.verifyAccessToken(accessToken);
  console.log(decoded);

  if (!decoded) {
    console.log("Invalid access token");
    return;
  }

  if (decoded.role === "company" || decoded.role === "interviewer") {
    const currentTime = Math.floor(Date.now() / 1000); 
    console.log(currentTime);
    console.log(decoded.exp && decoded.exp < currentTime);

    if (decoded.exp && decoded.exp < currentTime) {
      console.log("Token has expired");

      if (!refreshToken) {
        console.log("Refresh token not found");
       
      }
  console.log('referesjh');
  
      const refreshDecoded: any = authservicemiddleware.verifyRefereshToken(refreshToken);
      if (!refreshDecoded) {
        console.log("Invalid refresh token");

      }
 console.log('access')
      const name: string = refreshDecoded.name; 
      const role: string = refreshDecoded.role;
      const id: string = refreshDecoded.id;

      req.name = name;
      req.role=role;
      req.id=id;
      const newAccessToken = authservicemiddleware.generateAcessesToken(refreshDecoded);
      next();
    } else {
      console.log("access vvdcbccv");


      console.log(decoded);
      
        console.log('below');
        
      req.id = decoded.id;
      req.name=decoded.name;
      next();
    }
  } else {
    console.log("You are restricted from accessing this API");
    return;
  }
};
