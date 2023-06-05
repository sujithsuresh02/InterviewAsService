import React from 'react'
import Secondpage from "../../Components/Common/Interviewerlanding.jsx/Interviewlanding"
import Header from "../../Components/Common/Header/Header"
import Footer from "../../Components/Common/Footer/Footer"
import SecondInterviewLandingPage from '../../Components/Common/Interviewerlanding.jsx/SecondInterviewpage'
export default function SecondLandingpage() {
  return (
   <React.Fragment>
    <Header/>
    <Secondpage/>
    <SecondInterviewLandingPage/>
    <Footer/>
   </React.Fragment>
  )
}
