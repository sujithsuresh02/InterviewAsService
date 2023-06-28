"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviwerDbInterface = void 0;
const interviwerDbInterface = (implementationRepository) => {
    const addTimeSlots = async (timeSlotsata) => {
        return implementationRepository.addAvailableTimeSlot(timeSlotsata);
    };
    const getallAvilableTimeslots = async () => {
        return implementationRepository.getallAvailableTimeslots();
    };
    const getAllScheduledInterviews = async (interviewerId) => {
        return implementationRepository.scheduledInterviews(interviewerId);
    };
    const updateFeedback = async (feedbackDetails) => {
        return implementationRepository.addFeedbacKDetails(feedbackDetails);
    };
    const datewiseInterviewlisting = async () => {
        return implementationRepository.homepageInterviewListing();
    };
    const interviewCompleted = async (interviewId) => {
        return implementationRepository.allCompletedInterviews(interviewId);
    };
    const getInterviewDetails = async (interviewId) => {
        return implementationRepository.interviewDetails(interviewId);
    };
    const editProfile = async (userName, changedEmail, interviewerId) => {
        return implementationRepository.profileEdit(userName, changedEmail, interviewerId);
    };
    return {
        addTimeSlots,
        getallAvilableTimeslots,
        getAllScheduledInterviews,
        updateFeedback,
        datewiseInterviewlisting,
        interviewCompleted,
        getInterviewDetails,
        editProfile,
    };
};
exports.interviwerDbInterface = interviwerDbInterface;
