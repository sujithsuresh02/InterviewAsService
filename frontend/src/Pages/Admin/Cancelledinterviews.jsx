import React from 'react'
import Sidebar from '../../Components/Admin/Dashboard/Sidebar'
import CancelledInterviews from '../../Components/Admin/CancelledInterviews/CancelledInteriews'
export default function CancelledinterviewsPage() {
  return (
    <React.Fragment>
        <Sidebar allTables={<CancelledInterviews/>}/>
    </React.Fragment>
  )
}
