import React from 'react'
import SideBar from '../../Components/Admin/Dashboard/Sidebar'
import InterviewerTable from '../../Components/Admin/InterviewExpert/InterviewExpert'
export default function ViewexpertsRequests() {
  return (
  <React.Fragment>
    <SideBar allTables={<InterviewerTable/>}/>
  </React.Fragment>
  )
}
