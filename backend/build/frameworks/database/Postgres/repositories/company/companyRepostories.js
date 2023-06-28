"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesDbImplementation = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../../Connection/connection");
const company_1 = require("../../models/company");
const sequelize_2 = __importDefault(require("sequelize"));
const appError_1 = __importDefault(require("../../../../../utils/appError"));
const httpStatus_1 = require("../../../../../types/httpStatus");
const company_2 = require("../../models/company");
const Demo_1 = require("../../models/Demo");
const Subscription_1 = require("../../models/Subscription");
const Subscription_2 = require("../../models/Subscription");
connection_1.sequelize
    .sync()
    .then(() => {
    console.log("Database synchronized successfully!");
})
    .catch((error) => { });
const subscriptions = (0, Subscription_1.initSubscriptionModal)(connection_1.sequelize);
const payments = (0, Subscription_2.initPaymentmodal)(connection_1.sequelize);
const companiesDbImplementation = () => {
    const addrequests = (0, company_1.initaddRequestModal)(connection_1.sequelize);
    const postRequest = async (requestData) => {
        try {
            console.log(requestData);
            const { jobRole, jobDescription, optional, numberOfVacancy, TotalStudentsCount, companyId, } = requestData;
            const data = {
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
        }
        catch (error) {
            return error;
        }
    };
    const studentcvs = (0, company_2.initStudentDetailsModal)(connection_1.sequelize);
    const createStudentDetails = async ({ name, email, phone, experience, skills, education, projects, address, sex, age, certifications, }, addRequestTableId, companyId) => {
        const Data = {
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
            companyId: companyId,
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
            const response = await connection_1.sequelize.query(query, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: { RequestId },
            });
            console.log(response, "jobrole");
            const countQuery = `
    SELECT COUNT(*)
    FROM "studentcvs"
    WHERE "addRequestId"=:RequestId;
  `;
            const countresponse = await connection_1.sequelize.query(countQuery, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: { RequestId },
            });
            console.log(countresponse);
            console.log("total cv uploaded");
            let uploadedCVsCount = countresponse[0].count;
            let TotalStudentsCount = response[0].TotalStudentsCount;
            let jobrole = response[0].jobRole;
            return { TotalStudentsCount, uploadedCVsCount, jobrole };
        }
        catch (error) {
            console.log(error);
            throw new appError_1.default(error, httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    const demos = (0, Demo_1.initDemoDetailsModel)(connection_1.sequelize);
    const postDemoRequest = async (demoDetails) => {
        try {
            console.log(demoDetails);
            console.log("imp");
            const result = await demos.create({
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
            const response = await connection_1.sequelize.query(countQuery, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: { emailId },
            });
            console.log("result Details");
            return response[0];
        }
        catch (error) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error?.errors[0]?.message;
                console.log(error);
                console.error(errorMessage);
                throw new appError_1.default(errorMessage, httpStatus_1.HttpStatus.BAD_REQUEST);
            }
            else {
                console.error("An error occurred");
            }
        }
    };
    const saveOrderToDatabase = async ({ planName, companyId, validity, totalAmount, planId, numberOfInterviews, }, startDate, endDate, orderId) => {
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
        }
        catch (error) {
            console.log(error);
        }
    };
    const createPayment = async (orderId, paymentId, companyId) => {
        try {
            const statusUpdatequery = `
  UPDATE "subscriptions"
  SET "paymentStatus" = 'completed'
  WHERE "orderId" = :orderId;
`;
            const upadatedResponse = await connection_1.sequelize.query(statusUpdatequery, {
                type: sequelize_2.default.QueryTypes.UPDATE,
                replacements: { orderId },
            });
            console.log("status upfated successfully");
            const query = `
  SELECT "id" FROM "subscriptions"
  WHERE "orderId" = :orderId;
`;
            console.log(companyId);
            const subscriptionid = await connection_1.sequelize.query(query, {
                type: sequelize_2.default.QueryTypes.SELECT,
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
        }
        catch (error) {
            console.error("Failed to create payment:", error);
        }
    };
    const getPaymentHistort = async (companyId) => {
        try {
            const query = `
      SELECT "s"."planName", "s".validity, DATE("s"."endDate")AS "endDate" ,"s"."startDate", "s".id AS "subscriptionId", "p"."paymentId", "s"."totalAmount","s"."numberOfInterviews"
      FROM "subscriptions"AS s
      JOIN "payments" AS p ON "s"."id" = "p"."subscriptionId" WHERE "s"."companyId"=:companyId;
    `;
            const result = await connection_1.sequelize.query(query, {
                replacements: { companyId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(result);
            return result;
        }
        catch (error) { }
    };
    const editProfileDetails = async (username, changeEmail, companyId) => {
        try {
            console.log("IMPLEMETAION");
            const result = await connection_1.sequelize.query(`UPDATE "companies" SET "name" = :newName,email=:newEmail WHERE "id" = :companyId`, {
                replacements: {
                    newName: username,
                    companyId: companyId,
                    newEmail: changeEmail,
                },
                type: sequelize_1.QueryTypes.UPDATE,
            });
            return true;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getSignupData = async (companyId) => {
        try {
            const query = `SELECT "name","email","id" FROM "companies" WHERE "id"=:companyId`;
            const result = await connection_1.sequelize.query(query, {
                replacements: { companyId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(result, "signupdata");
            return result[0];
        }
        catch (error) {
            console.log(error);
        }
    };
    const totalNumberCvUploaded = async (companyId) => {
        try {
            const result = await connection_1.sequelize.query(`SELECT COUNT(*) AS "TotalStudentsCount"
        FROM "studentcvs" AS sc
        JOIN "addrequests" AS ar ON "sc"."addRequestId" = "ar"."id"
        WHERE "ar"."companyId" = :companyId;
        `, {
                replacements: { companyId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(result);
            const totalCvUploaded = result[0].TotalStudentsCount;
            return totalCvUploaded;
        }
        catch (error) {
            console.log(error);
        }
    };
    const retrieveValidationToken = async (email) => {
        try {
            const query = `SELECT "ValidationToken" FROM "companies" WHERE "email" =:email`;
            const result = await connection_1.sequelize.query(query, {
                replacements: { email },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result[0];
        }
        catch (error) { }
    };
    const getCompanyPassword = async (companyId) => {
        try {
            const query = `SELECT "password" FROM "companies" WHERE "id"=:companyId`;
            const CompanyPassword = await connection_1.sequelize.query(query, {
                replacements: { companyId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(CompanyPassword[0]);
            return CompanyPassword[0].password;
        }
        catch (error) { }
    };
    const resetPassword = async (hashedNewPassword, companyId) => {
        console.log("impl");
        console.log(hashedNewPassword);
        try {
            const query = `
      UPDATE "companies" SET "password" = :hashedNewPassword
      WHERE "id" = :companyId;
`;
            const result = await connection_1.sequelize.query(query, {
                replacements: { hashedNewPassword, companyId },
                type: sequelize_1.QueryTypes.UPDATE,
            });
            return true;
        }
        catch (error) { }
    };
    const getInterviewFeedbackDetails = async (companyId) => {
        try {
            const query = `
  SELECT *
  FROM "interviews" AS i
  JOIN "studentcvs" AS s ON i."studentId" = s."id"
  JOIN "addrequests" AS a ON s."addRequestId" = a."id"
  JOIN "companies" AS c ON a."companyId" = c."id"
  WHERE i."interviewStatus" = 'completed' AND "c"."id" = :companyId;
`;
            const result = await connection_1.sequelize.query(query, {
                replacements: { companyId },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(result);
            return result;
        }
        catch (error) {
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
exports.companiesDbImplementation = companiesDbImplementation;
