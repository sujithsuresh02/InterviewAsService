
import { InterviweImplementation } from "../../../frameworks/database/Postgres/repositories/Interviewer/InterviewerImplementation";
import { Timeslot, feedbackData } from "../../../types/InterviwerTypes";
export const interviwerDbInterface= (
  implementationRepository: ReturnType<InterviweImplementation>
) => {

  const addTimeSlots=async(timeSlotsata:Timeslot)=>{
     return implementationRepository.addAvailableTimeSlot(timeSlotsata)
  }
  const getallAvilableTimeslots=async()=>{
     return implementationRepository.getallAvailableTimeslots()
  }
  const getAllScheduledInterviews=async(interviewerId:string)=>{
     return implementationRepository.scheduledInterviews(interviewerId)
  }
  const updateFeedback=async(feedbackDetails:feedbackData)=>{
     return implementationRepository.addFeedbacKDetails(feedbackDetails)
  }
  const datewiseInterviewlisting=async()=>{
     return implementationRepository.homepageInterviewListing()
  }
  const interviewCompleted=async(interviewId:string)=>{
     return implementationRepository.allCompletedInterviews(interviewId)
  }
  const getInterviewDetails=async(interviewId:string)=>{
     return implementationRepository.interviewDetails(interviewId)
  }
  const editProfile=async(userName:string,changedEmail:string,interviewerId:string)=>{
     return implementationRepository.profileEdit(userName,changedEmail,interviewerId)
  }
 

  return{
    addTimeSlots,
    getallAvilableTimeslots,
    getAllScheduledInterviews,
    updateFeedback,
    datewiseInterviewlisting,
    interviewCompleted,
    getInterviewDetails,
    editProfile,

  }
}


export type InterviwerDbInterface = typeof interviwerDbInterface;
