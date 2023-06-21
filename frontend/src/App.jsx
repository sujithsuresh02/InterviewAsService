import React, { useEffect } from "react";
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
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFound from "./Components/Common/Pagenotfound";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./Errorboundaries/Errorfallback";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypalkeys from "./paypalKeys/paypalkeys";
import Room from "./Components/Zegacloud/Room";

function App() {
  const refreshToken = useSelector((state) => state?.Login?.refreshToken);
  console.log(refreshToken, "app .jsx");

  const initialOptions = {
    "client-id": Paypalkeys.client_id,
    currency: Paypalkeys.currency,
    intent: Paypalkeys.intent,
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <React.Fragment>
        <ErrorBoundary
          fallbackRender={ErrorFallback}
          onReset={() => alert("Error boundary reset")}
        >
          <ToastContainer />
          <Toaster />
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Common  Landing page Routes  */}
              <Route
                exact
                path="/interview_as_service"
                expect
                element={<SecondLandingpage />}
              />
              <Route exact path="/" expect element={<Landingpage />} />
              <Route
                exact
                path="/become_interviewexpert"
                expect
                element={<BecomeInterViwer />}
              />
              <Route exact path="/demo" expect element={<Demopage />} />
              <Route
                path="/login"
                element={
                  refreshToken ? <Navigate to="/company" /> : <LoginForm />
                }
              />
              <Route
                exact
                path="/signup/:token"
                expect
                element={<SignupForm />}
              />

              <Route path="/meeting/:interviewToken" element={<Room />} />
              {/* {Other Interface Errors} */}
              <Route path="/company/*" element={<CompanyRoutes />} />
              <Route path="/Admin/*" element={<AdminRoutes />} />
              <Route path="/interviewer/*" element={<Interviwer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </React.Fragment>
    </PayPalScriptProvider>
  );
}

export default App;
