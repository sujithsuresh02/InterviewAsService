import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes/admin";
import CompanyRoutes from "./Routes/CompanyRoutes/company";
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
import ScrollButton from "./Components/Common/Scrollupbutton/Scrollupbutton";
import { LoadingPage } from "./Components/Loading/Loadingpage";
import { lazy, Suspense } from "react";
import Chatpage from "./Pages/Chatpage/Chatpage";
import Changepassword from "./Pages/Forgotpasword/Changepassword";
import ForgotPasswordPage from "./Components/Common/Forgotpassword/Forgotpassword";
const LazyLandingpage = lazy(() => import("./Pages/Landingpage/Landingpage"));
const LazyBecomeInterViwer = lazy(() =>
  import("./Pages/Landingpage/BecomeInterViwer")
);
const LazySecondLandingpage = lazy(() =>
  import("./Pages/Landingpage/SecondLandinggpage")
);
function App() {
  const [showLoading, setShowLoading] = useState(true);
  const refreshToken = useSelector((state) => state?.commonLogin?.refreshToken);
  console.log(refreshToken, "app .jsx");

  const role = useSelector(
    (state) => state?.commonLogin?.loginDetails?.matchedAccount?.role
  );

  console.log(role, "role from the app.jsx");
  const initialOptions = {
    "client-id": Paypalkeys.client_id,
    currency: Paypalkeys.currency,
    intent: Paypalkeys.intent,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <PayPalScriptProvider options={initialOptions}>
        <ErrorBoundary
          fallbackRender={ErrorFallback}
          onReset={() => alert("Error boundary reset")}
        >
          <ToastContainer />
          <Toaster />
          <Router>
            {showLoading ? (
              <LoadingPage />
            ) : (
              <Suspense fallback={<LoadingPage />}>
                <ScrollToTop />
                <ScrollButton />
                <Routes>
                  <Route
                    exact
                    path="/interview_as_service"
                    expect
                    element={<LazySecondLandingpage />}
                  />
                  <Route
                    exact
                    path="/"
                    element={
                      role == "company" && refreshToken ? (
                        <Navigate to="/company" />
                      ) : role == "interviewer" && refreshToken ? (
                        <Navigate to="/interviewer" />
                      ) : (
                        <LazyLandingpage />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/become_interviewexpert"
                    expect
                    element={<LazyBecomeInterViwer />}
                  />
                  <Route exact path="/demo" expect element={<Demopage />} />
                  <Route
                    path="/login"
                    element={
                      refreshToken ? (
                        <Navigate to="/company" /> || (
                          <Navigate to="/interviewer" />
                        )
                      ) : (
                        <LoginForm />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/signup/:token"
                    expect
                    element={<SignupForm />}
                  />
                  <Route path="/chat" element={<Chatpage />} />
                  <Route
                    path="/change_password/:token"
                    element={<Changepassword />}
                  />
                  <Route
                    path="/forgotpassword"
                    element={<ForgotPasswordPage />}
                  />
                  <Route path="/meeting/:interviewToken" element={<Room />} />
                  <Route path="/company/*" element={<CompanyRoutes />} />
                  <Route path="/Admin/*" element={<AdminRoutes />} />
                  <Route
                    path="/interviewer/*"
                    element={
                      refreshToken ? <Interviwer /> : <Navigate to="/" />
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            )}
          </Router>
        </ErrorBoundary>
      </PayPalScriptProvider>
    </React.Fragment>
  );
}

export default App;
