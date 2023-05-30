import { QueryTypes } from "sequelize";
import { sequelize } from "../../Connection/connection";
import { initaddRequestModal } from "../../models/company";
import { addRequestFormData } from "../../../../../types/companyInterfaceTypes";
import { studentDetails } from "../../../../../types/companyInterfaceTypes";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { initStudentDetailsModal } from "../../models/company";
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
      } = requestData;

      const data: {
        jobRole: string;
        jobDescription: string;
        optional?: string;
        numberOfVacancy: number;
        TotalStudentsCount: number;
      } = {
        jobRole,
        jobDescription,
        optional,
        numberOfVacancy,
        TotalStudentsCount,
  
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

      console.log("student created");

      return student;
    } catch (error: any) {
      console.log(error)
      throw new AppError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
  return {
    postRequest,
    createStudentDetails,
  };
};

export type companyImplementation = typeof companiesDbImplementation;
