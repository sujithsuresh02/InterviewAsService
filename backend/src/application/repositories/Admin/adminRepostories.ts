import { UUID } from "crypto";
import { adminDbImplementation } from "../../../frameworks/database/Postgres/repositories/Admin/adminImplementation";
import {
  Plans,
  adminFormValues,
  editPlans,
  interviewData,
} from "../../../types/adminInterfaceType";
export const adminRepositoryInterface = (
  implementationRepository: ReturnType<adminDbImplementation>
) => {
  const registerAdmin = async (requestData: adminFormValues) => {
    return await implementationRepository.adminSignup(requestData);
  };

  const getCompanyByEmail = async (email: string) => {
    return await implementationRepository.getCompanyByEmail(email);
  };
  const getAllRequest = async () => {
    return await implementationRepository.getFullRequest();
  };

  const getStudentDetails = async (id: string) => {
    return await implementationRepository.getStudentDetails(id);
  };

  const getFullDemoRequest = () => {
    return implementationRepository.getDemoRequest();
  };

  const postSubscriptionPlans = (plandata: Plans) => {
    return implementationRepository.addSubscriptionPlans(plandata);
  };
  const getFullPlans = () => {
    return implementationRepository.getAllPlans();
  };
  const deletePlans = (id: string) => {
    return implementationRepository.deletePlans(id);
  };

  const editPlan = (editedData: editPlans) => {
    return implementationRepository.editPlans(editedData);
  };

  const assignInterviewer = (studentData: string) => {
    return implementationRepository.interviewerAssign(studentData);
  };

  const getFullTimeSlotData = () => {
    return implementationRepository.getFullTimeslotDetails();
  };

  const getInterviewExpertsRequets = () => {
    return implementationRepository.interviewExpertsRequest();
  };
  const getInterviewerToken = (email: string) => {
    return implementationRepository.getInterviewerToken(email);
  };
  const deleteInterviewerRequest = (id: string) => {
    return implementationRepository.interviewerDeleteRequest(id);
  };

  const postAssignInterview = (interviewDetails: interviewData) => {
    return implementationRepository.assignInterviewer(interviewDetails);
  };

  const scheduledInterviews = () => {
    return implementationRepository.getFullScheduledInterviews();
  };
  const cancelInterview = async (interviewerId: string) => {
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
  };
};

export type adminDbInterface = typeof adminRepositoryInterface;
