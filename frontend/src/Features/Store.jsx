import { configureStore } from "@reduxjs/toolkit";
import Signup from "../Features/Slices/signupSlice";
import postLogin from "./Slices/loginSlice";
import addRequests from "../Features/Slices/companySlice/companySlice";
import Adminsignup from "../Features/Slices/Admin/authSignup";
import GetfullRequest from "../Features/Slices/Admin/getFullRequests";
import AdminLogin from "../Features/Slices/Admin/adminLogin";
import CvUploads from "../Features/Slices/companySlice/CvUploadSlice";
import GetStudentDetails from "../Features/Slices/Admin/listStudentDetails";
import DemoDetails from "../Features/Slices/DemoSlice/DemoSlice";
import GetDemoRequest from "../Features/Slices/Admin/getDemoRequest";
import ConfirmationMail from "./Slices/Admin/SendConfirmmailSlice";
import AdminPlanDetails from "../Features/Slices/Admin/addPlans";
import Plans from "../Features/Slices/companySlice/Subscriptionplans";
import PaypalSlice from "../Features/Slices/Paypalslice/Paypalslice";
import ProfileSlice from "../Features/Slices/companySlice/Companyprofile";
import InterviwerSlice from "../Features/Slices/Interviewer/Interviewer";
import AddTimeSlot from "../Features/Slices/Admin/addTimeslot";
import BecomeInterviewExperts from "../Features/Slices/InterviewExpertslice/becominginterviewexpert";
import Interviews from "./Slices/Admin/Interviews";
import Dashboard from "./Slices/Admin/Dashboard";
import ChatSlice from "./Slices/Chat/ChatSlice";
// Load state from localStorage/
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle potential errors while saving
  }
};

const persistedState = loadState();
const store = configureStore({
  reducer: {
    CommonSignup: Signup,
    Login: postLogin,
    addrequest: addRequests,
    adminSignup: Adminsignup,
    adminLogin: AdminLogin,
    getAllRequets: GetfullRequest,
    studentDetails: GetStudentDetails,
    cvUploadDetails: CvUploads,
    demoDetails: DemoDetails,
    getDemo: GetDemoRequest,
    sendConfirmMail: ConfirmationMail,
    AdminPlanDetails: AdminPlanDetails,
    plans: Plans,
    paypal: PaypalSlice,
    profile: ProfileSlice,
    interviwer: InterviwerSlice,
    assignTimeSlot: AddTimeSlot,
    becomeInterviewExpert: BecomeInterviewExperts,
    interviews: Interviews,
    dashboard: Dashboard,
    chatslice: ChatSlice,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
