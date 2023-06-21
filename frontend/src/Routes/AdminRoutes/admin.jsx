import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Dashboardpage from "../../Pages/Admin/Dashboard";
import Viewstudentsdetails from "../../Pages/Admin/Viewstudentsdetails";
import Timeslotpage from "../../Pages/Admin/Timeslotpage";
import { Viewrequestpage } from "../../Pages/Admin/Viewrequests";
import Loginpage from "../../Pages/Admin/Loginpage";
import Signuppage from "../../Pages/Admin/Signup";
import ViewDemoPage from "../../Pages/Admin/ViewDemoPage";
import Subscriptionplans from "../../Pages/Admin/SubscriptionPlans";
import ViewSubscriptionPlans from "../../Pages/Admin/Viewplans";
import EditplansPage from "../../Pages/Admin/EditplansPage";
import ViewexpertsRequests from "../../Pages/Admin/ViewexpertsRequests";
import InterviewPage from "../../Pages/Admin/InterviewPage";
import CancelledinterviewsPage from "../../Pages/Admin/Cancelledinterviews";
function AdminRoutes() {
  const adminRefreshToken = useSelector(
    (state) => state.adminLogin.refreshToken
  );
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            adminRefreshToken ? (
              <Dashboardpage />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/view_request"
          element={
            adminRefreshToken ? (
              <Viewrequestpage />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />

        <Route
          path="/student_details"
          element={
            adminRefreshToken ? (
              <Viewstudentsdetails />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />

        <Route
          path="/addtime_slot"
          element={
            adminRefreshToken ? (
              <Timeslotpage />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/login"
          element={adminRefreshToken ? <Navigate to="/admin" /> : <Loginpage />}
        />

        <Route
          path="/signup"
          element={
            adminRefreshToken ? <Navigate to="/admin" /> : <Signuppage />
          }
        />
        <Route
          path="/view_demo"
          element={
            adminRefreshToken ? (
              <ViewDemoPage />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/view_plans"
          element={
            adminRefreshToken ? (
              <ViewSubscriptionPlans />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/add_plans"
          element={
            adminRefreshToken ? (
              <Subscriptionplans />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/edit_plans/:id"
          element={
            adminRefreshToken ? (
              <EditplansPage />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/view_interviewers"
          element={
            adminRefreshToken ? (
              <ViewexpertsRequests />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/interviews"
          element={
            adminRefreshToken ? (
              <InterviewPage />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/cancelled_interviews"
          element={
            adminRefreshToken ? (
              <CancelledinterviewsPage />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
