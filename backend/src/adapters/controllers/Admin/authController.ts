import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  adminDbImplementation,
  adminRepositoryImplementation,
} from "../../../frameworks/database/Postgres/repositories/Admin/adminImplementation";
import {
  adminDbInterface,
  adminRepositoryInterface,
} from "../../../application/repositories/Admin/adminRepostories";
import { adminServicesImplementation } from "../../../frameworks/services/adminServices";
import { adminServicesInterface} from "../../../application/services/adminService";
import { adminsRegister,performAdminLogin,getFullRequest } from "../../../application/useCases/Admin/admins";
const adminAuthController = (
  adminRepositoryInterface:adminDbInterface,
  adminRepositoryImplementation:adminDbImplementation,
  adminServiceInterface:adminServicesInterface,
  adminServiceImplementation:adminServicesImplementation

) => {
  const adminDbRepostory = adminRepositoryInterface(
    adminRepositoryImplementation()
  );
  const adminServiceRepostory=adminServiceInterface(  adminServiceImplementation ());
  const adminSignup = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  
    const response = await adminsRegister( req.body,adminDbRepostory,adminServiceRepostory);

    res.json({
      status:"Success",
      message:"Admin Creataed Successfully"
    })
  });

  const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    
     console.log(req.body);
     
    let loggedInDetails = await performAdminLogin(
      req.body,
      adminDbRepostory,
      adminServiceRepostory 
      )
      res.json({
        status: "success",
        message: "Admin Logged In Successfully",
        loggedInDetails,
      });
  });
 
   const getAllRequest=asyncHandler(async(req:Request,res:Response)=>{
    
const fullRequest= await getFullRequest(adminDbRepostory);
       res.json({
        fullRequest
       })

         
   })

  return{
    adminSignup,
    adminLogin,
    getAllRequest
  }
};

 export default  adminAuthController;
