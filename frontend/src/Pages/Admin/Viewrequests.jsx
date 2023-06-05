import React from 'react'
import Sidebar from "../../Components/Admin/Dashboard/Sidebar"
import Viewrequest from"../../Components/Admin/ViewRequests/Viewrequest"
export const  Viewrequestpage=()=> {
  return (
    <React.Fragment>
   <Sidebar allTables={<Viewrequest/>}/>
 
   </React.Fragment>
  )
}
