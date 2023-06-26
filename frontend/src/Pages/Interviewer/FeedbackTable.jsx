import React from "react";
import StudentTable from "../../Components/Interviewer/Feedback/Feedback";
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
export default function FeedbackTable() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          minHeight: "calc(100vh - 8rem)",
        }}
      >
        <StudentTable />
      </div>
      <Footer />
    </div>
  );
}
