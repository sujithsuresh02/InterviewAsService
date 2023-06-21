import { interviwerDbImplementation } from "../../../frameworks/database/Postgres/repositories/Interviewer/InterviewerImplementation";
import { Timeslot, feedbackData } from "../../../types/InterviwerTypes";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { InterviwerDbInterface } from "../../repositories/Interviewer/InterviewerInterface";

export const addTimeSlot = async (
  timeslotsData: Timeslot,
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  const response = await InterviewerDbRepository.addTimeSlots(timeslotsData);
  return response;
};

export const viewAllInterviewerTimeslots = async (
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  const response = await InterviewerDbRepository.getallAvilableTimeslots();
  return response;
};

export const getInterviews = async (
  interviewerId: string,
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  return InterviewerDbRepository.getAllScheduledInterviews(interviewerId);
};

export const addInterviewFeedBack = async (
  feedbackData: feedbackData,
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  return InterviewerDbRepository.updateFeedback(feedbackData);
};

export const DailyInterviews = async (
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  return InterviewerDbRepository.datewiseInterviewlisting();
};

export const interviewsCompleted = (
  interviewerId: string,
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  return InterviewerDbRepository.interviewCompleted(interviewerId);
};

export const interviewerDetails = (
  interviewerId: string,
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  return InterviewerDbRepository.getInterviewDetails(interviewerId);
};

export const editProfileDetails = async (
  userName: string,
  changedEmail: string,
  interviewerId: string,
  InterviewerDbRepository: ReturnType<InterviwerDbInterface>
) => {
  return InterviewerDbRepository.editProfile(
    userName,
    changedEmail,
    interviewerId
  );
};


