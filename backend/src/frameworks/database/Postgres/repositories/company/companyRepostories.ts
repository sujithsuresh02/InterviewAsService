import { QueryTypes } from "sequelize";
import { sequelize } from "../../Connection/connection";
import { initaddRequestModal } from "../../models/company";
import { addRequestFormData ,demoDetails} from "../../../../../types/companyInterfaceTypes";
import { studentDetails } from "../../../../../types/companyInterfaceTypes";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { initStudentDetailsModal } from "../../models/company";
import { initDemoDetailsModel } from "../../models/Demo";
import { error } from "cohere-ai/dist/models";

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {});

export const companiesDbImplementation = () => {
  const addrequests = initaddRequestModal(sequelize);

  const postRequest = async (requestData: addRequestFormData) => {
    try {
      console.log(requestData);

      const {
        jobRole,
        jobDescription,
        optional,
        numberOfVacancy,
        TotalStudentsCount,
        companyId
      } = requestData;

      const data: {
        jobRole: string;
        jobDescription: string;
        optional?: string;
        numberOfVacancy: number;
        TotalStudentsCount: number;
        companyId:string|undefined;
      } = {
        jobRole,
        jobDescription,
        optional,
        numberOfVacancy,
        TotalStudentsCount,
         companyId
      };

      if (optional === undefined || optional === null) {
        delete data.optional;
      }

      const response = await addrequests.create(data);

      const addRequestId = response.dataValues.id;

      return addRequestId;
    } catch (error) {
      return error;
    }
  };

  const studentcvs = initStudentDetailsModal(sequelize);
  const createStudentDetails = async ({
    name,
    email,
    phone,
    experience,
    skills,
    education,
    projects,
    address,
    sex,
    age,
    certifications,
  }: studentDetails,addRequestTableId:BigInt) => {
    const Data: {
      name: string;
      email: string;
      phone: string;
      experience?: string;
      skills: string;
      education: string;
      projects?: string | null;
      address?: string | null;
      sex?: string | null;
      age?: string | null;
      certifications?: string | null;
      addRequestId:BigInt
    } = {
      name: name,
      email: email,
      phone: phone,
      experience: experience?experience:"Fresher",
      skills: skills,
      education: education,
      projects: projects,
      address: address,
      sex: sex,
      age: age,
      certifications: certifications,
      addRequestId:addRequestTableId
    };
  console.log('dnndndb');
  
console.log(Data);

    try {
      const student = await studentcvs.create(Data);
      console.log(student);

      
      const RequestId=  Data.addRequestId 
      console.log(RequestId);
      console.log("addrequestid");
      
      const query = `
      SELECT "TotalStudentsCount"

      FROM "addrequests"
      WHERE "id" = :RequestId;
    `;


    const response:any = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { RequestId},
    });

    const countQuery = `
    SELECT COUNT(*)
    FROM "studentcvs"
    WHERE "addRequestId" = :RequestId;
  `;
    const countresponse:any = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT,
      replacements: { RequestId},
    });
         console.log(countresponse);
          console.log('total cv uploaded');
          
     let uploadedCVsCount=countresponse[0].count
    let TotalStudentsCount=response[0].TotalStudentsCount
    
      return {student,TotalStudentsCount,uploadedCVsCount};
    } catch (error: any) {
      console.log(error)
      throw new AppError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  const demos=initDemoDetailsModel(sequelize)
  const postDemoRequest=async(demoDetails:demoDetails)=>{

    try{

      console.log(demoDetails);
      
      console.log('imp');
      
      // const{
      //   fullName,
      //   company,
      //   role,
      //   emailId,
      //   contactNumber,
      //   learnAboutUs,
      //   message


      // }=demoDetails

    // const Data={

    //   fullName,
    //     company,
    //     role,
    //     emailId,
    //     contactNumber,
    //     learnAboutUs,
    //     message
    // }={

    // }

    const result :any= await demos.create({
      fullName: demoDetails.fullName,
      company: demoDetails.company,
      role: demoDetails.role,
      emailId: demoDetails.emailId,
      contactNumber: demoDetails.contactNumber,
      learnAboutUs: demoDetails.learnAboutUs,
      message: demoDetails.message,
    });
  
    let emailId=demoDetails.emailId;
    const countQuery = `
    SELECT "ValidationToken","fullName"
    FROM "demos"
    WHERE "emailId" = :emailId;
  `;
    const response:any = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT,
      replacements: { emailId},
    });
  
   
console.log('result Details');

return response[0]



    }catch (error:any) {
      if (error.errors && error.errors.length > 0) {
        const errorMessage = error?.errors[0]?.message;
        console.log(error);
        
        console.error(errorMessage);
    throw new AppError(errorMessage,HttpStatus.BAD_REQUEST);

        // You can use the errorMessage as needed (e.g., pass it to the frontend)
      } else {
        console.error('An error occurred');
      }
    }
  }
  return {
    postRequest,
    createStudentDetails,
    postDemoRequest
  };
};

export type companyImplementation = typeof companiesDbImplementation;
