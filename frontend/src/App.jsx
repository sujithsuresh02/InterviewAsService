import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "../src/Pages/Landingpage/Landingpage";
import AdminRoutes from "./Routes/AdminRoutes/admin";
import CompanyRoutes from "./Routes/CompanyRoutes/company";
import SecondLandingpage from "./Pages/Landingpage/SecondLandinggpage";
import BecomeInterViwer from "./Pages/Landingpage/BecomeInterViwer";
import ScrollToTop from "./Components/Common/ScrollUp";
import Demopage from "./Pages/Landingpage/Demopage";
import LoginForm from "./Components/Common/auth/CommonLogin";
import SignupForm from "./Components/Common/auth/CommonSignup";
import Interviwer from "./Routes/InterviewerRoute/Interviwer";
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { useSelector, } from "react-redux";
import {Navigate} from "react-router-dom"

function App() {

  const refreshToken = useSelector((state) => state?.Login?.refreshToken);
  console.log(refreshToken,"app .jsx");
  return (
    <React.Fragment>
      <ToastContainer />
      <Toaster/>
    <Router>
    <ScrollToTop/>
<Routes>
        <Route
          exact
          path="/interview_as_service"
          expect
          element={<SecondLandingpage />}
        />
        <Route exact path="/" expect element={<Landingpage />} />
        <Route exact path="/become_interviewexpert" expect element={<BecomeInterViwer />} />
        <Route exact path="/demo" expect element={<Demopage />} />
        <Route path="/login" element={refreshToken ? <Navigate to="/company" />: <LoginForm/>}
      />
        <Route exact path="/signup/:token" expect element={<SignupForm />} />




        <Route path="/company/*" element={<CompanyRoutes />} />
        <Route path="/Admin/*" element={<AdminRoutes />} />
        <Route path="/interviewer/*" element={<Interviwer />} />
     
   </Routes>
    </Router>
    </React.Fragment>
  );
}

export default App;
