import { BIGINT, QueryTypes } from "sequelize";
import { sequelize } from "../../Connection/connection";
import Sequelize from "sequelize";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { FormValues } from "../../../../../types/interviewExperts";
import { initInterviewExpertModal } from "../../models/becomeInterviewExperts";
import { response } from "express";
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {});
const interviewexperts = initInterviewExpertModal(sequelize);
export const becomeExpertsImplementation = () => {
  const postInterviewExpert = async ({
    fullName,
    currentEmployer,
    linkedIn,
    phoneNumber,
    email,
    cvFile,
    experience,
    graduationYear,
    domainExpertise,
    message,
  }: FormValues) => {
    try {
      const data: any = {
        fullName,
        phoneNumber,
        email,
        linkedIn,
        cvFile,
        currentEmployer,
        experience,
        graduationYear,
        domainExpertise,
        message,
      };
      const result: any = await interviewexperts.create(data, {
        returning: true,
      });
      const name = result.dataValues.fullName;
      const Token = result.dataValues.Token;

      return { name, Token };
    } catch (error) {
      console.log(error);
    }
  };

  const validateinterviewToken = async (Token: string) => {
    try {
      console.log(Token,"token");
      
      const query = ` SELECT "interviewToken" FROM "interviews" WHERE "interviewToken" = :Token`;
      const response: any = await sequelize.query(query, {
        replacements: { Token: Token },
        type: QueryTypes.SELECT,
      });
      console.log(response,"response");
      
      return response[0].interviewToken;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    postInterviewExpert,
    validateinterviewToken,
  };
};
export type becomeexpertsDbImplementation = typeof becomeExpertsImplementation;
