"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServiceInterface = void 0;
const adminServiceInterface = (Service) => {
    console.log("password");
    const encryptPassword = async (password) => Service.encryptPassword(password);
    const comparePassword = (password, hashedPassword) => Service.comparePassword(password, hashedPassword);
    const generateAcessesToken = (payload) => Service.generateAcessesToken(payload);
    const generateRefreshTokenToken = (payload) => Service.generateRefreshTokenToken(payload);
    const sendConfirmationMail = (email) => {
        return Service.sendEmailConfirmation(email);
    };
    const sendInterviewerConfirmationMail = (Token, email, name) => {
        return Service.interviewerConfirmationEmail(Token, email, name);
    };
    const interviewerRejectionMail = (email) => {
        return Service.rejectionEmail(email);
    };
    const InterviewScheduledConfirmation = (interviewerEmail, studentEmail, Date, Time, interviewToken) => {
        return Service.InterviewConfirmationMail(interviewerEmail, studentEmail, Date, Time, interviewToken);
    };
    return {
        encryptPassword,
        comparePassword,
        generateAcessesToken,
        generateRefreshTokenToken,
        sendConfirmationMail,
        sendInterviewerConfirmationMail,
        interviewerRejectionMail,
        InterviewScheduledConfirmation
    };
};
exports.adminServiceInterface = adminServiceInterface;
