import React from 'react'
import InterviewesTable from '../../Components/Interviewer/Interviews/interviewcompleted'
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
export default function Upcominginterviews() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
   <Header/>
   <div style={{ flex: 1, marginTop: '8rem' }}>
<InterviewesTable/>
</div>
<Footer/>
   </div>
  )
}
