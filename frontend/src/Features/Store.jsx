import { configureStore } from "@reduxjs/toolkit";
import postsignup from "../Features/Slices/signupSlice";
 import postLogin from "./Slices/loginSlice"
import  addRequests from "../Features/Slices/companySlice/companySlice"
import Adminsignup from "../Features/Slices/Admin/authSignup"
import GetfullRequest  from "../Features/Slices/Admin/getFullRequests"
import AdminLogin from "../Features/Slices/Admin/adminLogin"
import listStudentDetails from "./Slices/Admin/listStudentDetails";
 // Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
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
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Handle potential errors while saving
  }
};

const persistedState = loadState();
 const store = configureStore({
  reducer: {
    signup: postsignup,
    Login:postLogin,
    addrequest:addRequests,
    adminSignup:Adminsignup,
    adminLogin:AdminLogin,
    getAllRequets:GetfullRequest,
    getStudentDetails:listStudentDetails
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});



 export default store