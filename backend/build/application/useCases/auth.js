"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordValidation = exports.changingPasssword = exports.forgottingPassword = exports.interviewerSignupValidation = exports.signupPageValidation = exports.googleUserLogin = exports.performLogin = exports.companyRegister = void 0;
const httpStatus_1 = require("../../types/httpStatus");
const appError_1 = __importDefault(require("../../utils/appError"));
const companyRegister = async (signupDetails, authRepository, authService) => {
    signupDetails.email = signupDetails.email.toLowerCase();
    const isExistingEmail = await authRepository.getByEmailSignup(signupDetails.email, signupDetails.role);
    if (isExistingEmail.length > 0) {
        console.log("existing email: ");
        throw new appError_1.default("existing email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (signupDetails.password.length <= 3) {
        console.log("password length is 0: ");
        throw new appError_1.default("Password Empty", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    signupDetails.password = await authService.encryptPassword(signupDetails.password);
    const registerResponse = await authRepository.registerCompany(signupDetails);
    console.log("controllers usecase ");
    return {
        registerResponse,
    };
};
exports.companyRegister = companyRegister;
const performLogin = async (loginDetails, authRepository, authService) => {
    const signupedperson = await authRepository.getByEmail(loginDetails.email);
    console.log(signupedperson);
    console.log("signupedperson");
    console.log(signupedperson === null);
    if (signupedperson.length === 0) {
        throw new appError_1.default("You Are Entered Incorrect Email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    let matchedAccount = null;
    for (const account of signupedperson) {
        const passwordMatched = await authService.comparePassword(loginDetails.password, account.password);
        if (passwordMatched) {
            const { password, ...accountWithoutPassword } = account;
            matchedAccount = accountWithoutPassword;
            break;
        }
    }
    if (!matchedAccount) {
        throw new appError_1.default("your password was incorrect. Please check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    console.log(matchedAccount);
    // return matchedAccount
    const payload = {
        id: matchedAccount.id,
        name: matchedAccount.name,
        role: matchedAccount.role,
    };
    const accessToken = authService.generateAcessesToken(payload);
    const refreshToken = authService.generateRefreshTokenToken(payload);
    console.log(accessToken);
    console.log("usecase");
    console.log(refreshToken);
    return { matchedAccount, refreshToken, accessToken };
};
exports.performLogin = performLogin;
const googleUserLogin = async (user, authRepository, authService) => {
    const signupedperson = await authRepository.getByEmail(user.email);
    console.log(signupedperson);
    console.log('ggoglr gmail signed up');
    if (signupedperson.length > 0) {
        let matchedAccount;
        for (const account of signupedperson) {
            const { password, ...accountWithoutPassword } = account;
            matchedAccount = accountWithoutPassword;
            break;
        }
        const payload = {
            id: matchedAccount.id,
            name: matchedAccount.name,
            role: matchedAccount.role,
        };
        const accessToken = authService.generateAcessesToken(payload);
        const refreshTokenToken = authService.generateRefreshTokenToken(payload);
        // return accessToken;
    }
    else {
        const payload = {
            name: user.name,
            email: user.email,
        };
        const result = await authRepository.registerCompany(user);
        console.log(result, "gooogle");
        const accessToken = authService.generateAcessesToken(payload);
        const refreshTokenToken = authService.generateRefreshTokenToken(payload);
        // return {accessToken,refreshTokenToken}
    }
};
exports.googleUserLogin = googleUserLogin;
const signupPageValidation = async (toekn, authRepository) => {
    return await authRepository.signupvaliadtion(toekn);
};
exports.signupPageValidation = signupPageValidation;
const interviewerSignupValidation = async (token, authRepository) => {
    return await authRepository.validateInterviewerSignup(token);
};
exports.interviewerSignupValidation = interviewerSignupValidation;
const forgottingPassword = async (email, authRepository, authService) => {
    const resposne = await authRepository.getByEmail(email);
    console.log(resposne, "from auth usecase");
    return await authService.forgotPasswordEmailVerification(resposne[0]?.name, resposne[0]?.email, resposne[0]?.id);
};
exports.forgottingPassword = forgottingPassword;
const changingPasssword = async (newPassword, email, role, authRepository, authService) => {
    const hashedPasword = await authService.encryptPassword(newPassword);
    console.log(hashedPasword, "hasges");
    if (hashedPasword) {
        return await authRepository.changePassword(hashedPasword, email, role);
    }
};
exports.changingPasssword = changingPasssword;
const forgotPasswordValidation = async (token, authRepository) => {
    return await authRepository.validateForgotPassword(token);
};
exports.forgotPasswordValidation = forgotPasswordValidation;
