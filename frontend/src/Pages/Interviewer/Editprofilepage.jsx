import React from 'react'
import InterviewerProfilesidebar from '../../Components/Interviewer/profile/Profilesidebar'
import EditProfile from '../../Components/Interviewer/profile/Editprofile'
import Header from '../../Components/Common/Header/Header'
export default function Editprofilepage() {
  return (
   <React.Fragment>
    <Header/>
    <InterviewerProfilesidebar pages={<EditProfile/>} />
   </React.Fragment>
  )
}
