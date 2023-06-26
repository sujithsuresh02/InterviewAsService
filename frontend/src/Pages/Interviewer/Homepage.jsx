import React from 'react'
import Homepage from '../../Components/Interviewer/Homepage/Homepage'
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
export default function InterviewerHomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header/>
    <div style={{ flex: 1, marginTop: '8rem' }}>
    <Homepage/>
    </div>
    <Footer/>
    </div>
  )
}
