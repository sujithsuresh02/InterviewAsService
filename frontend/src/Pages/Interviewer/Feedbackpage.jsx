import React from "react";
import FeedbackDetails from "../../Components/Interviewer/Feedback/Feedback";
import StudentTable from "../../Components/Interviewer/Feedback/Feedback";
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
export default function Feedbackpage() {
  return (
    <React.Fragment>
      <Header />
      {/* <FeedbackDetails /> */}
      <StudentTable/>
      {/* <Footer /> */}
    </React.Fragment>
  );
}
