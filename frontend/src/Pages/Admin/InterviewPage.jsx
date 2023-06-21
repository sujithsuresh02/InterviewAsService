import React from 'react'
import Sidebar from "../../Components/Admin/Dashboard/Sidebar";
import Viewinterviews from '../../Components/Admin/Viewinterviews/Viewinterviews';
export default function InterviewPage() {
  return (
    <React.Fragment>
        <Sidebar allTables={<Viewinterviews/>}/>
    </React.Fragment>
  )
}
