// Interviewer.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Feedbackpage from "../../Pages/Interviewer/Feedbackpage";
import FeedbackTable from "../../Pages/Interviewer/FeedbackTable";
import Upcominginterviews from "../../Pages/Interviewer/Upcominginterviews";
import Addtimeslots from "../../Pages/Interviewer/Addtimeslots";
import InterviewerHomePage from "../../Pages/Interviewer/Homepage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import EditFeedbackDetailsPage from "../../Components/Interviewer/Feedback/Editfeedback";
import Editfeedbackpage from "../../Pages/Interviewer/Editfeedbackpage";
import Editprofilepage from "../../Pages/Interviewer/Editprofilepage";
export default function Interviwer() {
  const refreshToken = useSelector((state) => state?.commonLogin?.refreshToken);
  console.log(refreshToken, "router");

  return (
    <Routes>
      <Route
        path="/feedback"
        element={refreshToken ? <FeedbackTable /> : <Navigate to="/" />}
      />
      <Route
        path="/add_feedback/:interviewId"
        element={refreshToken ? <Feedbackpage /> : <Navigate to="/" />}
      />
      <Route
        path="/completed_interviews"
        element={refreshToken ? <Upcominginterviews /> : <Navigate to="/" />}
      />
      <Route
        path="/add_timeslot"
        element={refreshToken ? <Addtimeslots /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={refreshToken ? <InterviewerHomePage /> : <Navigate to="/" />}
      />
      <Route
        path="/editfeedback/:interviewId"
        element={refreshToken ? <Editfeedbackpage /> : <Navigate to="/" />}
      />
       <Route
        path="/profile"
        element={refreshToken ? <Editprofilepage/> : <Navigate to="/" />}
      />
    </Routes>
    
  );
}
      ``