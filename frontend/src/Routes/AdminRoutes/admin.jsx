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
        <Route path="/login" element={
            adminRefreshToken ? (
                <Navigate to="/admin" />
            ) : (
                <Loginpage />
            )
          } />

        <Route path="/signup"  element={
            adminRefreshToken ? (
                <Navigate to="/admin" />
            ) : (
                <Signuppage />
            )
          } />
           <Route path="/view_demo"  element={
            adminRefreshToken?(
           <ViewDemoPage/>):(
            <Navigate to="/admin/login" />
           )
          } />
      </Routes>
    </>
  );
}

export default AdminRoutes;
