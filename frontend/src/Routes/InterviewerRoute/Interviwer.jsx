import React from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Feedbackpage from "../../Pages/Interviewer/Feedbackpage";
import FeedbackTable from "../../Pages/Interviewer/FeedbackTable";
import Upcominginterviews from "../../Pages/Interviewer/Upcominginterviews";
import Addtimeslots from "../../Pages/Interviewer/Addtimeslots";
import InterviewerHomePage from "../../Pages/Interviewer/Homepage";
export default function Interviwer() {
  return (
    <>
      <Routes>
        <Route path="/feedback" element={<FeedbackTable />} />
        <Route path="/add_feedback" element={<Feedbackpage />} />
        <Route path="/upcoming_interviews" element={<Upcominginterviews />} />
        <Route path="/add_timeslot" element={<Addtimeslots />} />
        <Route path="/" element={<InterviewerHomePage />} />
      </Routes>
    </>
  );
}
