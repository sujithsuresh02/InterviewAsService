"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepositoryInterface = void 0;
const adminRepositoryInterface = (implementationRepository) => {
    const registerAdmin = async (requestData) => {
        return await implementationRepository.adminSignup(requestData);
    };
    const getCompanyByEmail = async (email) => {
        return await implementationRepository.getCompanyByEmail(email);
    };
    const getAllRequest = async () => {
        return await implementationRepository.getFullRequest();
    };
    const getStudentDetails = async (id) => {
        return await implementationRepository.getStudentDetails(id);
    };
    const getFullDemoRequest = () => {
        return implementationRepository.getDemoRequest();
    };
    const postSubscriptionPlans = (plandata) => {
        return implementationRepository.addSubscriptionPlans(plandata);
    };
    const getFullPlans = () => {
        return implementationRepository.getAllPlans();
    };
    const deletePlans = (id) => {
        return implementationRepository.deletePlans(id);
    };
    const editPlan = (editedData) => {
        return implementationRepository.editPlans(editedData);
    };
    const assignInterviewer = (studentData) => {
        return implementationRepository.interviewerAssign(studentData);
    };
    const getFullTimeSlotData = () => {
        return implementationRepository.getFullTimeslotDetails();
    };
    const getInterviewExpertsRequets = () => {
        return implementationRepository.interviewExpertsRequest();
    };
    const getInterviewerToken = (email) => {
        return implementationRepository.getInterviewerToken(email);
    };
    const deleteInterviewerRequest = (id) => {
        return implementationRepository.interviewerDeleteRequest(id);
    };
    const postAssignInterview = (interviewDetails) => {
        return implementationRepository.assignInterviewer(interviewDetails);
    };
    const scheduledInterviews = () => {
        return implementationRepository.getFullScheduledInterviews();
    };
    const cancelInterview = async (interviewerId) => {
        return await implementationRepository.interviewCancellation(interviewerId);
    };
    const cancelledInterviews = async () => {
        return await implementationRepository.intereviewsCancelled();
    };
    const daywiseSubscriptionCount = async () => {
        return await implementationRepository.subscriptionCount();
    };
    const monthlySubscriptionCount = async () => {
        return await implementationRepository.monthwiseSubscriptionCount();
    };
    const totalClientCount = async () => {
        return await implementationRepository.totalClientsAndInterviewCount();
    };
    const fullSubscriptionHistory = async (companyId) => {
        return await implementationRepository.subscriptionHistory(companyId);
    };
    const checkInterviewStatus = async (companyId) => {
        return await implementationRepository.interviewStatusChecking(companyId);
    };
    return {
        registerAdmin,
        getCompanyByEmail,
        getAllRequest,
        getStudentDetails,
        getFullDemoRequest,
        postSubscriptionPlans,
        getFullPlans,
        deletePlans,
        editPlan,
        assignInterviewer,
        getFullTimeSlotData,
        getInterviewExpertsRequets,
        getInterviewerToken,
        deleteInterviewerRequest,
        postAssignInterview,
        scheduledInterviews,
        cancelInterview,
        cancelledInterviews,
        daywiseSubscriptionCount,
        monthlySubscriptionCount,
        totalClientCount,
        fullSubscriptionHistory,
        checkInterviewStatus
    };
};
exports.adminRepositoryInterface = adminRepositoryInterface;
