"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyServiceInterface = void 0;
const companyServiceInterface = (companyService) => {
    const extractDataFromPdf = (path) => {
        return companyService.extractData(path);
    };
    const createSubscribtion = (subscriptionData) => {
        return companyService.createSubscription(subscriptionData);
    };
    const capturePayment = (orderId) => {
        return companyService.verifyPayment(orderId);
    };
    const sentEmailConfirmation = (email, name, Token) => {
        return companyService.resetPasswordEmailConfirmation(email, name, Token);
    };
    const encryptPassword = async (password) => companyService.encryptPassword(password);
    const comparePassword = (password, hashedPassword) => companyService.comparePassword(password, hashedPassword);
    return {
        extractDataFromPdf,
        createSubscribtion,
        capturePayment,
        sentEmailConfirmation,
        encryptPassword,
        comparePassword
    };
};
exports.companyServiceInterface = companyServiceInterface;
