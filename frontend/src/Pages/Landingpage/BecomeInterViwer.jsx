import React from "react";
import BecomInterviewExpert from "../../Components/Common/Interviewerlanding.jsx/BecomInterviewExpert";
import Header from "../../Components/Common/Header/Header";
import DownwardBecomeInterviewExpertPage from"../../Components/Common/Interviewerlanding.jsx/DownwardBecomeInterviewExpert"
import InterviewExpertForm from "../../Components/Common/Interviewerlanding.jsx/InterviewExpertForm";
import Footer from '../../Components/Common/Footer/Footer'

export default function BecomeInterViwer() {
  return (
    <>
      <Header />
      <BecomInterviewExpert />
      <DownwardBecomeInterviewExpertPage/>
      <InterviewExpertForm/>
      <Footer/>
      
    </>
  );
}
