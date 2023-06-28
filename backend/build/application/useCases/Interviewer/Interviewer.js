"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileDetails = exports.interviewerDetails = exports.interviewsCompleted = exports.DailyInterviews = exports.addInterviewFeedBack = exports.getInterviews = exports.viewAllInterviewerTimeslots = exports.addTimeSlot = void 0;
const addTimeSlot = async (timeslotsData, InterviewerDbRepository) => {
    const response = await InterviewerDbRepository.addTimeSlots(timeslotsData);
    return response;
};
exports.addTimeSlot = addTimeSlot;
const viewAllInterviewerTimeslots = async (InterviewerDbRepository) => {
    const response = await InterviewerDbRepository.getallAvilableTimeslots();
    return response;
};
exports.viewAllInterviewerTimeslots = viewAllInterviewerTimeslots;
const getInterviews = async (interviewerId, InterviewerDbRepository) => {
    return InterviewerDbRepository.getAllScheduledInterviews(interviewerId);
};
exports.getInterviews = getInterviews;
const addInterviewFeedBack = async (feedbackData, InterviewerDbRepository) => {
    return InterviewerDbRepository.updateFeedback(feedbackData);
};
exports.addInterviewFeedBack = addInterviewFeedBack;
const DailyInterviews = async (InterviewerDbRepository) => {
    return InterviewerDbRepository.datewiseInterviewlisting();
};
exports.DailyInterviews = DailyInterviews;
const interviewsCompleted = (interviewerId, InterviewerDbRepository) => {
    return InterviewerDbRepository.interviewCompleted(interviewerId);
};
exports.interviewsCompleted = interviewsCompleted;
const interviewerDetails = (interviewerId, InterviewerDbRepository) => {
    return InterviewerDbRepository.getInterviewDetails(interviewerId);
};
exports.interviewerDetails = interviewerDetails;
const editProfileDetails = async (userName, changedEmail, interviewerId, InterviewerDbRepository) => {
    return InterviewerDbRepository.editProfile(userName, changedEmail, interviewerId);
};
exports.editProfileDetails = editProfileDetails;
