import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "../src/Pages/Landingpage/Landingpage";
import Students from "./Components/Company/Studendetails/Students";
import AddRequest from "./Components/Company/Addrequest/Request";
import Viewrequests from "../src/Pages/Admin/Viewrequests";
import Dashboard from "../src/Pages/Admin/Dashboard";
import Viewstudents from "../src/Pages/Admin/Viewstudentsdetails";
import Adminsignup from "../src/Pages/Admin/Signup";
import AdminLoginpage from "../src/Pages/Admin/Loginpage";
import Addtimeslotpage from "./Pages/Admin/Timeslotpage";
import SignupForm from "./Components/Common/auth/Signupform";
import Loginform from "./Components/Common/auth/Login";
import Secondingpage from "./Pages/Landingpage/Secondingpage";
import Homepage from "./Pages/Company/homepage";
import AddRequestPage from "./Pages/Company/AddRequestPage";
import StudentDetailspage from "./Pages/Company/StudentDetailspage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/interview_as_service"
          expect
          element={<Secondingpage />}
        />
        <Route exact path="/" expect element={<Landingpage />} />

        {/* <Route path="/signup"  element={SignupForm}/> */}
        <Route path="/login" element={Loginform} />

        {/*==================================> Company====================================>  */}
        <Route path="/company" element={<Homepage />} />
        <Route path="/company/student_details" element={<StudentDetailspage />} />
        <Route path="/company/add_request" element={<AddRequestPage />} />
        {/* {<================================== Admin  =========================================>} */}
        <Route path="/Admin" element={<Dashboard />} />
        <Route path="/Admin/login" element={<AdminLoginpage />} />
        <Route path="/Admin/signup" element={<Adminsignup />} />
        <Route path="/Admin/view_request" element={<Viewrequests />} />
        <Route path="/Admin/student_details" element={<Viewstudents />} />
        <Route path="/Admin/addtime_slot" element={<Addtimeslotpage />} />
      </Routes>
    </Router>
  );
}

export default App;
