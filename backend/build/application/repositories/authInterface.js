"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyDbRepository = void 0;
const companyDbRepository = (repository) => {
    const registerCompany = async (signupDetails) => {
        console.log("mm");
        console.log(signupDetails);
        console.log("this is interface");
        return await repository.registerCompany(signupDetails);
    };
    const getByEmail = async (email) => await repository.getByEmail(email);
    const getByEmailSignup = async (email, role) => {
        return await repository.getByEmailSignup(email, role);
    };
    const signupvaliadtion = (token) => repository.validateSignupPage(token);
    const validateInterviewerSignup = (token) => repository.interviewerSignupValidation(token);
    const changePassword = (newPassword, email, role) => repository.changingPassword(newPassword, email, role);
    const validateForgotPassword = (token) => repository.forgotPasswordValidation(token);
    return {
        registerCompany,
        getByEmail,
        getByEmailSignup,
        signupvaliadtion,
        validateInterviewerSignup,
        changePassword,
        validateForgotPassword
    };
};
exports.companyDbRepository = companyDbRepository;
