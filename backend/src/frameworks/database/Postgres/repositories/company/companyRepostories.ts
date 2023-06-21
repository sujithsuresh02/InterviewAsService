import { BIGINT, QueryTypes } from "sequelize";
import { sequelize } from "../../Connection/connection";
import { initaddRequestModal } from "../../models/company";
import Sequelize from "sequelize";
import {
  SubscriptionDetails,
  addRequestFormData,
  demoDetails,
} from "../../../../../types/companyInterfaceTypes";
import { studentDetails } from "../../../../../types/companyInterfaceTypes";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { initStudentDetailsModal } from "../../models/company";
import { initDemoDetailsModel } from "../../models/Demo";
import { initSubscriptionModal } from "../../models/Subscription";
import { initPaymentmodal } from "../../models/Subscription";
import { response } from "express";
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {});
const subscriptions = initSubscriptionModal(sequelize);
const payments = initPaymentmodal(sequelize);

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
        companyId,
      } = requestData;

      const data: {
        jobRole: string;
        jobDescription: string;
        optional?: string;
        numberOfVacancy: number;
        TotalStudentsCount: number;
        companyId: string | undefined;
      } = {
        jobRole,
        jobDescription,
        optional,
        numberOfVacancy,
        TotalStudentsCount,
        companyId,
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
  const createStudentDetails = async (
    {
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
    }: studentDetails,
    addRequestTableId: BigInt
  ) => {
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
      addRequestId: BigInt;
    } = {
      name: name,
      email: email,
      phone: phone,
      experience: experience ? experience : "Fresher",
      skills: skills,
      education: education,
      projects: projects,
      address: address,
      sex: sex,
      age: age,
      certifications: certifications,
      addRequestId: addRequestTableId,
    };

    console.log(Data);

    try {
      const student = await studentcvs.create(Data);

      const RequestId = Data.addRequestId;
      console.log(RequestId);
      console.log("addrequestid");

      const query = `
      SELECT "TotalStudentsCount","jobRole"
      FROM "addrequests"
      WHERE "id" = :RequestId;
    `;

      const response: any = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { RequestId },
      });

      console.log(response, "jobrole");

      const countQuery = `
    SELECT COUNT(*)
    FROM "studentcvs"
    WHERE "addRequestId"=:RequestId;
  `;
      const countresponse: any = await sequelize.query(countQuery, {
        type: QueryTypes.SELECT,
        replacements: { RequestId },
      });
      console.log(countresponse);
      console.log("total cv uploaded");

      let uploadedCVsCount = countresponse[0].count;
      let TotalStudentsCount = response[0].TotalStudentsCount;
      let jobrole = response[0].jobRole;
      return { TotalStudentsCount, uploadedCVsCount, jobrole };
    } catch (error: any) {
      console.log(error);
      throw new AppError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  const demos = initDemoDetailsModel(sequelize);
  const postDemoRequest = async (demoDetails: demoDetails) => {
    try {
      console.log(demoDetails);

      console.log("imp");

      const result: any = await demos.create({
        fullName: demoDetails.fullName,
        company: demoDetails.company,
        role: demoDetails.role,
        emailId: demoDetails.emailId,
        contactNumber: demoDetails.contactNumber,
        learnAboutUs: demoDetails.learnAboutUs,
        message: demoDetails.message,
      });

      let emailId = demoDetails.emailId;
      const countQuery = `
    SELECT "ValidationToken","fullName"
    FROM "demos"
    WHERE "emailId" = :emailId;
  `;
      const response: any = await sequelize.query(countQuery, {
        type: QueryTypes.SELECT,
        replacements: { emailId },
      });

      console.log("result Details");

      return response[0];
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        const errorMessage = error?.errors[0]?.message;
        console.log(error);

        console.error(errorMessage);
        throw new AppError(errorMessage, HttpStatus.BAD_REQUEST);
      } else {
        console.error("An error occurred");
      }
    }
  };

  const saveOrderToDatabase = async (
    {
      planName,
      companyId,
      validity,
      totalAmount,
      planId,
      numberOfInterviews,
    }: SubscriptionDetails,
    startDate: number,
    endDate: number,
    orderId: number
  ) => {
    const subscriptionData = {
      planName: planName,
      planId: planId,
      companyId: companyId,
      totalAmount: totalAmount,
      numberOfInterviews: numberOfInterviews,
      validity: validity,
      startDate: startDate,
      endDate: endDate,
      orderId: orderId,
    };

    try {
      const subscription = await subscriptions.create(subscriptionData);
      console.log(subscription);
      console.log("subscription");
    } catch (error) {
      console.log(error);
    }
  };

  const createPayment = async (
    orderId: string,
    paymentId: string,
    companyId: string
  ) => {
    try {
      const statusUpdatequery = `
  UPDATE "subscriptions"
  SET "paymentStatus" = 'completed'
  WHERE "orderId" = :orderId;
`;

      const upadatedResponse = await sequelize.query(statusUpdatequery, {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: { orderId },
      });

      console.log("status upfated successfully");
      const query = `
  SELECT "id" FROM "subscriptions"
  WHERE "orderId" = :orderId;
`;

      console.log(companyId);

      const subscriptionid: any = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { orderId },
      });

      const subscriptionId = subscriptionid[0]?.id;
      console.log(subscriptionId);

      console.log(paymentId, "paymentid");

      const result = await payments.create({
        subscriptionId,
        paymentId,
        companyId,
      });

      console.log("Payment created successfully:", result);
      return true;
    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  const getPaymentHistort = async (companyId: string) => {
    try {
      const query = `
      SELECT "s"."planName", "s".validity, DATE("s"."endDate")AS "endDate" ,"s"."startDate", "s".id AS "subscriptionId", "p"."paymentId", "s"."totalAmount","s"."numberOfInterviews"
      FROM "subscriptions"AS s
      JOIN "payments" AS p ON "s"."id" = "p"."subscriptionId" WHERE "s"."companyId"=:companyId;
    `;
      const result = await sequelize.query(query, {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      });

      console.log(result);
      return result;
    } catch (error) {}
  };

  const editProfileDetails = async (
    username: string,
    changeEmail: string,
    companyId: BigInt
  ) => {
    try {
      console.log("IMPLEMETAION");

      const result = await sequelize.query(
        `UPDATE "companies" SET "name" = :newName,email=:newEmail WHERE "id" = :companyId`,
        {
          replacements: {
            newName: username,
            companyId: companyId,
            newEmail: changeEmail,
          },
          type: QueryTypes.UPDATE,
        }
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const getSignupData = async (companyId: string) => {
    try {
      const query = `SELECT "name","email","id" FROM "companies" WHERE "id"=:companyId`;

      const result = await sequelize.query(query, {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      });
      console.log(result, "signupdata");
      return result[0];
    } catch (error) {
      console.log(error);
    }
  };

  const totalNumberCvUploaded = async (companyId: string) => {
    try {
      const result: any = await sequelize.query(
        `SELECT COUNT(*) AS "TotalStudentsCount"
        FROM "studentcvs" AS sc
        JOIN "addrequests" AS ar ON "sc"."addRequestId" = "ar"."id"
        WHERE "ar"."companyId" = :companyId;
        `,
        {
          replacements: { companyId },
          type: QueryTypes.SELECT,
        }
      );

      console.log(result);

      const totalCvUploaded = result[0].TotalStudentsCount;
      return totalCvUploaded;
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveValidationToken = async (email: string) => {
    try {
      const query = `SELECT "ValidationToken" FROM "companies" WHERE "email" =:email`;

      const result: any = await sequelize.query(query, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });
      return result[0];
    } catch (error) {}
  };

  const getCompanyPassword = async (companyId: bigint) => {
    try {
      const query = `SELECT "password" FROM "companies" WHERE "id"=:companyId`;

      const CompanyPassword: any = await sequelize.query(query, {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      });
      console.log(CompanyPassword[0]);

      return CompanyPassword[0].password;
    } catch (error) {}
  };

  const resetPassword = async (hashedNewPassword: any, companyId: bigint) => {
    console.log("impl");
    console.log(hashedNewPassword);

    try {
      const query = `
      UPDATE "companies" SET "password" = :hashedNewPassword
      WHERE "id" = :companyId;
`;

      const result = await sequelize.query(query, {
        replacements: { hashedNewPassword, companyId },
        type: QueryTypes.UPDATE,
      });

      return true;
    } catch (error) {}
  };

  const getInterviewFeedbackDetails = async (companyId: string) => {
    try {
      const query = `
  SELECT *
  FROM "interviews" AS i
  JOIN "studentcvs" AS s ON i."studentId" = s."id"
  JOIN "addrequests" AS a ON s."addRequestId" = a."id"
  JOIN "companies" AS c ON a."companyId" = c."id"
  WHERE i."interviewStatus" = 'completed' AND "c"."id" = :companyId;
`;

      const result = await sequelize.query(query, {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      });

      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    postRequest,
    createStudentDetails,
    postDemoRequest,
    saveOrderToDatabase,
    createPayment,
    getPaymentHistort,
    editProfileDetails,
    getSignupData,
    totalNumberCvUploaded,
    retrieveValidationToken,
    resetPassword,
    getCompanyPassword,
    getInterviewFeedbackDetails,
  };
};

export type companyImplementation = typeof companiesDbImplementation;
