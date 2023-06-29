import React from "react";
import InterviewerAvailability from "../../Components/Interviewer/Timeslot/Addtimeslot";
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
export default function Addtimeslots() {
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
      <InterviewerAvailability />
      </div>
      <Footer />
    </div>
  );
}
