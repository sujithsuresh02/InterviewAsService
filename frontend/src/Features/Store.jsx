import { configureStore } from "@reduxjs/toolkit";
import postsignup from "../Features/Slices/signupSlice";
import postLogin from "./Slices/loginSlice";
import addRequests from "../Features/Slices/companySlice/companySlice";
import Adminsignup from "../Features/Slices/Admin/authSignup";
import GetfullRequest from "../Features/Slices/Admin/getFullRequests";
import AdminLogin from "../Features/Slices/Admin/adminLogin";
import CvUploads from "../Features/Slices/companySlice/CvUploadSlice"
import GetStudentDetails from "../Features/Slices/Admin/listStudentDetails"
import DemoDetails from "../Features/Slices/DemoSlice/DemoSlice"
import GetDemoRequest from "../Features/Slices/Admin/getDemoRequest"
import  ConfirmationMail from "./Slices/Admin/SendConfirmmailSlice";
import Addplans from "../Features/Slices/Admin/addPlans";
import Plans from "../Features/Slices/companySlice/Subscriptionplans"
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
    signup: postsignup,
    Login: postLogin,
    addrequest: addRequests,
    adminSignup: Adminsignup,
    adminLogin: AdminLogin,
    getAllRequets: GetfullRequest,
    getStudentDetails: GetStudentDetails,
    cvUploadDetails: CvUploads,
    demo:DemoDetails,
    getDemo:GetDemoRequest,
    sendConfirmMail:ConfirmationMail,
    addplansDetails:Addplans,
    plans:Plans

  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
