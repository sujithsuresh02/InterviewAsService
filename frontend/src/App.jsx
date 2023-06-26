import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "../src/Pages/Landingpage/Landingpage";
import AdminRoutes from "./Routes/AdminRoutes/admin";
import CompanyRoutes from "./Routes/CompanyRoutes/company";
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
import ScrollButton from "./Components/Common/Scrollupbutton/Scrollupbutton";
import { LoadingPage } from "./Components/Loading/Loadingpage";
import { lazy, Suspense } from "react";
import Companychat from "./Components/Companychat/Chat/Companychat";
import Chats from "./Components/Companychat/Chat/Companychat";
import ChatWidget from "./Components/Companychat/Chat/Companychat";
const LazyLandingpage = lazy(() => import("./Pages/Landingpage/Landingpage"));
const LazyBecomeInterViwer = lazy(() =>
  import("./Pages/Landingpage/BecomeInterViwer")
);
const LazySecondLandingpage = lazy(() =>
  import("./Pages/Landingpage/SecondLandinggpage")
);
function App() {
  const [showLoading, setShowLoading] = useState(true);
  const refreshToken = useSelector((state) => state?.Login?.refreshToken);
  console.log(refreshToken, "app .jsx");

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
                  <Route exact path="/" element={<LazyLandingpage />} />
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

                  <Route path="/company/*" element={<CompanyRoutes />} />
                  <Route path="/Admin/*" element={<AdminRoutes />} />
                  <Route path="/interviewer/*" element={<Interviwer />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/chats" element={< ChatWidget />} />
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
