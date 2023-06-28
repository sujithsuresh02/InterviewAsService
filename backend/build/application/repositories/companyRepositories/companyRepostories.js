"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyDbInterface = void 0;
const companyDbInterface = (implementationRepository) => {
    const addRequests = async (requestData) => {
        console.log(addRequests);
        console.log("this is interface");
        return await implementationRepository.postRequest(requestData);
    };
    const insertStudentDetails = (studentDetails, addRequestId, companyId) => {
        return implementationRepository.createStudentDetails(studentDetails, addRequestId, companyId);
    };
    const postDemo = (demoDetails) => {
        console.log('interface');
        return implementationRepository.postDemoRequest(demoDetails);
    };
    const saveOrderToDatabase = (subscriptionData, startDate, endDate, orderId) => {
        console.log('interface');
        return implementationRepository.saveOrderToDatabase(subscriptionData, startDate, endDate, orderId);
    };
    const createPayment = (orderId, paymentId, companyId) => {
        console.log('interface');
        return implementationRepository.createPayment(orderId, paymentId, companyId);
    };
    const getAllPaymentHistory = (companyId) => {
        return implementationRepository.getPaymentHistort(companyId);
    };
    const profileEdit = (username, changeEmail, companyId) => {
        return implementationRepository.editProfileDetails(username, changeEmail, companyId);
    };
    const signUpData = (companyId) => {
        return implementationRepository.getSignupData(companyId);
    };
    const totalCvUploaded = (companyId) => {
        return implementationRepository.totalNumberCvUploaded(companyId);
    };
    const getvalidationToken = (email) => {
        return implementationRepository.retrieveValidationToken(email);
    };
    const postResetPassword = (newPassword, compantId) => {
        return implementationRepository.resetPassword(newPassword, compantId);
    };
    const CompanyPassword = (compantId) => {
        return implementationRepository.getCompanyPassword(compantId);
    };
    const getFeedbackDetails = (companyId) => {
        return implementationRepository.getInterviewFeedbackDetails(companyId);
    };
    return {
        addRequests,
        insertStudentDetails,
        postDemo,
        saveOrderToDatabase,
        createPayment,
        getAllPaymentHistory,
        profileEdit,
        signUpData,
        totalCvUploaded,
        getvalidationToken,
        postResetPassword,
        CompanyPassword,
        getFeedbackDetails
    };
};
exports.companyDbInterface = companyDbInterface;
