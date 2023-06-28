"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingInterviewStatus = exports.getAllSubscriptionHistory = exports.totalClientAndInterviewsCount = exports.monthwiseSubscriptionCount = exports.subscriptionCount = exports.interviewCancelled = exports.interviewCancellation = exports.getFullScheduledInterviews = exports.assignInterviewer = exports.rejectionMail = exports.emailConfirmation = exports.getIntervieweExpertsRequest = exports.getTimeSlotDetails = exports.assignTimeSlot = exports.editPlan = exports.deletePlans = exports.getAllPlans = exports.postPlans = exports.sendConfirmMail = exports.getFullDemoRequest = exports.getFullStudentDetils = exports.getFullRequest = exports.performAdminLogin = exports.adminsRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const adminsRegister = async (data, adminDbRepostory, adminDbService) => {
    if (data.password.length <= 3) {
        console.log("password length is 0: ");
        throw new appError_1.default("Password Must Be Eight Chatacter", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    console.log(data);
    data.password = await adminDbService.encryptPassword(data.password);
    console.log("password hashed ");
    let resposne = await adminDbRepostory.registerAdmin(data);
    console.log("response");
    console.log(resposne);
    return true;
};
exports.adminsRegister = adminsRegister;
const performAdminLogin = async (loginDetails, adminDbRepostory, adminDbService) => {
    const signupedperson = await adminDbRepostory.getCompanyByEmail(loginDetails.email);
    if (!signupedperson) {
        throw new appError_1.default("You Are Entered Incorrect Email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    let matchedAccount = null;
    for (const account of signupedperson) {
        const passwordMatched = await adminDbService.comparePassword(loginDetails.password, account.password);
        if (passwordMatched) {
            const { password, ...accountWithoutPassword } = account;
            matchedAccount = accountWithoutPassword;
            break;
        }
    }
    if (!matchedAccount) {
        throw new appError_1.default("Sorry, your password was incorrect. Please check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    console.log(matchedAccount);
    console.log("matched");
    // return matchedAccount
    const payload = {
        id: matchedAccount.id,
        name: matchedAccount.name,
        role: "admin",
    };
    const accessToken = adminDbService.generateAcessesToken(payload);
    const refreshToken = adminDbService.generateRefreshTokenToken(payload);
    console.log(accessToken);
    console.log("usecase");
    console.log(refreshToken);
    return { matchedAccount, refreshToken, accessToken };
};
exports.performAdminLogin = performAdminLogin;
const getFullRequest = async (adminDbRepostory) => {
    const response = await adminDbRepostory.getAllRequest();
    return response;
};
exports.getFullRequest = getFullRequest;
const getFullStudentDetils = async (adminDbRepostory, id) => {
    const response = await adminDbRepostory.getStudentDetails(id);
    return response;
};
exports.getFullStudentDetils = getFullStudentDetils;
const getFullDemoRequest = async (adminDbRepostory) => {
    const response = await adminDbRepostory.getFullDemoRequest();
    console.log(response);
    console.log("from usecase");
    return response;
};
exports.getFullDemoRequest = getFullDemoRequest;
const sendConfirmMail = async (email, adminDbService) => {
    const response = await adminDbService.sendConfirmationMail(email);
    return response;
};
exports.sendConfirmMail = sendConfirmMail;
const postPlans = async (planDta, adminDbRepostory) => {
    const response = await adminDbRepostory.postSubscriptionPlans(planDta);
    return response;
};
exports.postPlans = postPlans;
const getAllPlans = async (adminDbRepostory) => {
    const response = await adminDbRepostory.getFullPlans();
    return response;
};
exports.getAllPlans = getAllPlans;
const deletePlans = async (id, adminDbRepostory) => {
    const response = await adminDbRepostory.deletePlans(id);
    return response;
};
exports.deletePlans = deletePlans;
const editPlan = async (editedData, adminDbRepostory) => {
    const response = await adminDbRepostory.editPlan(editedData);
    return response;
};
exports.editPlan = editPlan;
const assignTimeSlot = async (studentId, adminDbRepostory) => {
    const response = adminDbRepostory.assignInterviewer(studentId);
    return response;
};
exports.assignTimeSlot = assignTimeSlot;
const getTimeSlotDetails = async (adminDbRepostory) => {
    const response = adminDbRepostory.getFullTimeSlotData();
    return response;
};
exports.getTimeSlotDetails = getTimeSlotDetails;
const getIntervieweExpertsRequest = async (adminDbRepostory) => {
    const result = adminDbRepostory.getInterviewExpertsRequets();
    return result;
};
exports.getIntervieweExpertsRequest = getIntervieweExpertsRequest;
const emailConfirmation = async (email, adminDbRepostory, adminDbService) => {
    const { Token, name } = await adminDbRepostory.getInterviewerToken(email);
    if (Token && name) {
        const result = adminDbService.sendInterviewerConfirmationMail(Token, email, name);
        return result;
    }
};
exports.emailConfirmation = emailConfirmation;
const rejectionMail = async (email, id, adminDbService, adminDbRepostory) => {
    const response = await adminDbService.interviewerRejectionMail(email);
    if (response) {
        const Id = await adminDbRepostory.deleteInterviewerRequest(id);
        return Id;
    }
};
exports.rejectionMail = rejectionMail;
const assignInterviewer = async (interviewDetails, interviewerEmail, studentEmail, adminDbRepostory, adminDbService) => {
    const interviewToken = await adminDbRepostory.postAssignInterview(interviewDetails);
    console.log(interviewToken);
    const emailresponse = await adminDbService.InterviewScheduledConfirmation(interviewerEmail, studentEmail, interviewDetails.SelectedDate, interviewDetails.selectedTime, interviewToken);
    console.log(emailresponse);
    if (emailresponse) {
        console.log(emailresponse);
        console.log(interviewToken);
        return interviewToken;
    }
};
exports.assignInterviewer = assignInterviewer;
const getFullScheduledInterviews = async (adminDbRepostory) => {
    return adminDbRepostory.scheduledInterviews();
};
exports.getFullScheduledInterviews = getFullScheduledInterviews;
const interviewCancellation = async (intereviewId, adminDbRepostory) => {
    return await adminDbRepostory.cancelInterview(intereviewId);
};
exports.interviewCancellation = interviewCancellation;
const interviewCancelled = async (adminDbRepostory) => {
    return await adminDbRepostory.cancelledInterviews();
};
exports.interviewCancelled = interviewCancelled;
const subscriptionCount = async (adminDbRepostory) => {
    return await adminDbRepostory.daywiseSubscriptionCount();
};
exports.subscriptionCount = subscriptionCount;
const monthwiseSubscriptionCount = async (adminDbRepostory) => {
    return await adminDbRepostory.monthlySubscriptionCount();
};
exports.monthwiseSubscriptionCount = monthwiseSubscriptionCount;
const totalClientAndInterviewsCount = async (adminDbRepostory) => {
    return await adminDbRepostory.totalClientCount();
};
exports.totalClientAndInterviewsCount = totalClientAndInterviewsCount;
const getAllSubscriptionHistory = async (companyId, adminDbRepostory) => {
    return await adminDbRepostory.fullSubscriptionHistory(companyId);
};
exports.getAllSubscriptionHistory = getAllSubscriptionHistory;
const checkingInterviewStatus = async (companyId, adminDbRepostory) => {
    return await adminDbRepostory.checkInterviewStatus(companyId);
};
exports.checkingInterviewStatus = checkingInterviewStatus;
