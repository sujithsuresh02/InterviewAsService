import React from "react";
import InterviewerProfilesidebar from "../../Components/Interviewer/profile/Profilesidebar";
import EditProfile from "../../Components/Interviewer/profile/Editprofile";
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
export default function Editprofilepage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div style={{ flex: 1 }}>
        <InterviewerProfilesidebar pages={<EditProfile />} />
      </div>
      <Footer />
    </div>
  );
}
