import React from 'react'
import Sidebar from "../../Components/Admin/Dashboard/Sidebar"
import Viewrequest from"../../Components/Admin/ViewRequests/Viewrequest"
export default function requests() {
  return (
    <React.Fragment>
   <Sidebar/>
   <Viewrequest/>
   </React.Fragment>
  )
}
