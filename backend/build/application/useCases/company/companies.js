"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackDetails = exports.resetPassword = exports.passwordemailConfirmation = exports.uploadedCvCount = exports.getSignupdata = exports.editProfile = exports.getFullPaymentHistort = exports.verifyPayment = exports.createSubscription = exports.getAllPlans = exports.postDemoRequest = exports.postRequestWithCVDetails = exports.postRequest = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const postRequest = async (data, CompanyDbRepository, CompanyServiceRepository) => {
    let addRequestId = await CompanyDbRepository.addRequests(data);
    console.log(addRequestId);
    console.log("first");
    console.log("response of cv details inserted ");
    return { addRequestId };
};
exports.postRequest = postRequest;
const postRequestWithCVDetails = async (cvDetails, addRequestId, CompanyDbRepository, CompanyServiceRepository) => {
    let insertionResult;
    if (cvDetails.path) {
        const response = await CompanyServiceRepository.extractDataFromPdf(cvDetails.path);
        const StudentDetails = await JSON.parse(response);
        console.log(addRequestId);
        insertionResult = await CompanyDbRepository.insertStudentDetails(StudentDetails, addRequestId, cvDetails.companyId);
        console.log("everything completed");
        console.log(insertionResult);
        console.log("insertion result");
    }
    else {
        console.log("CV path is undefined. Unable to extract data from PDF.");
        throw new appError_1.default("Upload Only Pdf File", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return {
        uploadedCVsCount: insertionResult.uploadedCVsCount,
        TotalStudentsCount: insertionResult.TotalStudentsCount,
        jobRole: insertionResult.jobrole,
    };
};
exports.postRequestWithCVDetails = postRequestWithCVDetails;
const postDemoRequest = async (demoDetails, CompanyDbRepository) => {
    let demoInsertionResponse = await CompanyDbRepository.postDemo(demoDetails);
    return demoInsertionResponse;
};
exports.postDemoRequest = postDemoRequest;
const getAllPlans = async (adminDbRepostory) => {
    const response = await adminDbRepostory.getFullPlans();
    return response;
};
exports.getAllPlans = getAllPlans;
const createSubscription = async (subscriptionDetails, CompanyServiceRepository, CompanyDbRepository) => {
    const response = await CompanyServiceRepository.createSubscribtion(subscriptionDetails);
    console.log(response);
    const insertedResult = await CompanyDbRepository.saveOrderToDatabase(subscriptionDetails, response?.startDate, response?.endDate, response?.orderId);
    return response;
};
exports.createSubscription = createSubscription;
const verifyPayment = async (orderId, companyId, CompanyServiceRepository, CompanyDbRepository) => {
    console.log("enter usecase");
    const paymentId = await CompanyServiceRepository.capturePayment(orderId);
    const result = await CompanyDbRepository.createPayment(orderId, paymentId, companyId);
    return result;
};
exports.verifyPayment = verifyPayment;
const getFullPaymentHistort = async (companyId, CompanyDbRepository) => {
    return await CompanyDbRepository.getAllPaymentHistory(companyId);
};
exports.getFullPaymentHistort = getFullPaymentHistort;
const editProfile = async (username, changeEmail, companyid, CompanyDbRepository) => {
    const response = await CompanyDbRepository.profileEdit(username, changeEmail, companyid);
    return true;
};
exports.editProfile = editProfile;
const getSignupdata = async (companyId, CompanyDbRepository) => {
    return await CompanyDbRepository.signUpData(companyId);
};
exports.getSignupdata = getSignupdata;
const uploadedCvCount = async (companyId, CompanyDbRepository) => {
    const response = await CompanyDbRepository.totalCvUploaded(companyId);
    return response;
};
exports.uploadedCvCount = uploadedCvCount;
const passwordemailConfirmation = async (email, name, CompanyServiceRepository, CompanyDbRepository) => {
    const Token = await CompanyDbRepository.getvalidationToken(email);
    if (Token) {
        const response = CompanyServiceRepository.sentEmailConfirmation(email, name, Token);
        return response;
    }
};
exports.passwordemailConfirmation = passwordemailConfirmation;
const resetPassword = async (newPassword, oldPassword, compantId, CompanyDbRepository, CompanyServiceRepository) => {
    const hashedOldPassword = await CompanyDbRepository.CompanyPassword(compantId);
    const passwordMatched = await CompanyServiceRepository.comparePassword(oldPassword, hashedOldPassword);
    console.log(passwordMatched);
    if (passwordMatched) {
        const hashedNewpassword = await CompanyServiceRepository.encryptPassword(newPassword);
        const response = await CompanyDbRepository.postResetPassword(hashedNewpassword, compantId);
        if (response) {
            return response;
        }
    }
};
exports.resetPassword = resetPassword;
const FeedbackDetails = async (companyId, CompanyDbRepository) => {
    return CompanyDbRepository.getFeedbackDetails(companyId);
};
exports.FeedbackDetails = FeedbackDetails;
