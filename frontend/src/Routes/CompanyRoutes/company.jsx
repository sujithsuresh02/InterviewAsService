import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CompanyHomepage from "../../Pages/Company/Homepage";
import AddRequestPage from "../../Pages/Company/AddRequestPage";
import StudentDetailsPage from "../../Pages/Company/StudentDetailsPage";
import ListingPlans from "../../Pages/Company/ListingPlans";
import Checkout from "../../Pages/Company/checkout";
import SuccessPage from "../../Components/Company/Checkoutpage/Successpage";
import Transactionpage from "../../Pages/Company/Transactionpage";
import Editprofilepage from "../../Pages/Company/Editprofilepage";
import ResetpasswordPage from "../../Pages/Company/resetpassword";
import Feedbackpage from "../../Pages/Company/Feedbackpage";
import Pdf from "../../Components/Common/Pdf";
function CompanyRoutes() {
  const refreshToken = useSelector((state) => state?.commonLogin?.refreshToken);
  console.log(refreshToken, "router");
  return (
    <Routes>
      <Route
        path="/"
        element={refreshToken ? <CompanyHomepage /> : <Navigate to="/" />}
      />
      <Route
        path="/add_request"
        element={refreshToken ? <AddRequestPage /> : <Navigate to="/" />}
      />
      <Route
        path="/student_details"
        element={refreshToken ? <StudentDetailsPage /> : <Navigate to="/" />}
      />
      <Route
        path="/plans"
        element={refreshToken ? <ListingPlans /> : <Navigate to="/" />}
      />
      <Route
        path="/checkout/:id"
        element={refreshToken ? <Checkout /> : <Navigate to="/" />}
      />
      <Route
        path="/success"
        element={refreshToken ? <SuccessPage /> : <Navigate to="/" />}
      />

      <Route
        path="/subscription_history"
        element={refreshToken ? <Transactionpage /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={refreshToken ? <Editprofilepage /> : <Navigate to="/" />}
      />
      <Route
        path="/reset_password/:Token"
        element={refreshToken ? <ResetpasswordPage /> : <Navigate to="/" />}
      />
      <Route
        path="/feedback/:studentId"
        element={refreshToken ? <Feedbackpage /> : <Navigate to="/" />}
      />
      {/* <Route
        path="/pdf"
        element={refreshToken ? <Pdf /> : <Navigate to="/" />}
      /> */}
    </Routes>
  );
}

export default CompanyRoutes;
