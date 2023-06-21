import React from "react";
import StudentTable from "../../Components/Interviewer/Feedback/Feedback";
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
export default function FeedbackTable() {
  return (
    <React.Fragment>
      <Header   />
      <StudentTable/>
      <Footer />
    </React.Fragment>
  );
}
