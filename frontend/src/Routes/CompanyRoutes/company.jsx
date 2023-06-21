import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CompanyHomepage from "../../Pages/Company/Homepage";
import AddRequestPage from "../../Pages/Company/AddRequestPage";
import StudentDetailsPage from "../../Pages/Company/StudentDetailsPage";
import ListingPlans from "../../Pages/Company/ListingPlans";
import Checkout from "../../Pages/Company/checkout";
function CompanyRoutes() {
  const refreshToken = useSelector((state) => state?.Login?.refreshToken);
 console.log(refreshToken,"router");
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
        element={refreshToken ? < Checkout/> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default CompanyRoutes;
