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
import { adminServicesInterface } from "../../../application/services/adminService";
import { Plans, editPlans } from "../../../types/adminInterfaceType";
import {
  getFullRequest,
  getFullStudentDetils,
  getFullDemoRequest,
  sendConfirmMail,
  postPlans,
  getAllPlans,
deletePlans,
editPlan
} from "../../../application/useCases/Admin/admins";
import { UUID } from "crypto";
const adminsController = (
  adminRepositoryInterface: adminDbInterface,
  adminRepositoryImplementation: adminDbImplementation,
  adminServiceInterface: adminServicesInterface,
  adminServiceImplementation: adminServicesImplementation
) => {
  const adminDbRepostory = adminRepositoryInterface(
    adminRepositoryImplementation()
  );
  const adminServiceRepostory = adminServiceInterface(
    adminServiceImplementation()
  );

  const getAllRequest = asyncHandler(async (req: Request, res: Response) => {
    const fullRequest = await getFullRequest(adminDbRepostory);
    res.json({
      fullRequest,
    });
  });

  const getStudentCVDetails = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.params.id);
      console.log("params");

      let id: string = req.params.id;
      const response = await getFullStudentDetils(adminDbRepostory, id);
      res.json({
        response,
      });
    }
  );
  const getDemoRequest = asyncHandler(async (req: Request, res: Response) => {
    const result = await getFullDemoRequest(adminDbRepostory);

    res.json({
      result,
    });
  });

  const sendConfirmationMail = asyncHandler(
    async (req: Request, res: Response) => {
      console.log("controller entered");

      console.log(req.params.email);
      console.log("params");

      let email: string = req.params.email;

      console.log(req.params.email);
      const result = await sendConfirmMail(email, adminServiceRepostory);
      res.json({
        message: "Email has been Sent Successfully",
      });
    }
  );

  const postSubscriptionPlans = asyncHandler(
    async (req: Request, res: Response) => {
      console.log(req.body);
      console.log("controllers");

      const {
        features,
        interviews,
        planName,
        price,
        validity,
      } = req.body;
  
     const  plansData :Plans={
      features,
      interviews,
      planName,
      price,
      validity,
     }
      const response= await postPlans(plansData,adminDbRepostory)
  
      if(response){
        res.json({
          status:"Success",
          message :"Plan Added Successfully"
        })
      }
    }
  );
  
  const getFullPlans = asyncHandler(
    async (req: Request, res: Response) => {
      
     
      const fullPlans= await getAllPlans(adminDbRepostory)
  
      if(fullPlans){
        res.json({
          fullPlans
        })
      }
    }
  );

  const deletePlan=asyncHandler(async(req:Request,res:Response)=>{

    console.log(req.params.id);
    const Id:string=req.params.id
     const response :any = await deletePlans(Id,adminDbRepostory)

 if(response){

   res.json({
    id:Id,
    status:'Success',
    message:"Plan Deleted Successfully"
   })
 }
  })

   const editPlans=asyncHandler(async(req:Request,res:Response)=>{
 console.log(req.body);
 
    const {
      features,
      interviews,
      planName,
      price,
      validity,
      planId
    } = req.body;

   const  plansData :editPlans={
    features,
    interviews,
    planName,
    price,
    validity,
    planId
   }
    const editedResponse= await editPlan( plansData,adminDbRepostory)
      if(editedResponse){
        res.json({
          status:"Success",
          message:"Plans Updated  Successfully"
        })
      }
   })
  return {
    getAllRequest,
    getStudentCVDetails,
    getDemoRequest,
    sendConfirmationMail,
    postSubscriptionPlans,
    getFullPlans,
    deletePlan,
    editPlans
  };
};

export default adminsController;
