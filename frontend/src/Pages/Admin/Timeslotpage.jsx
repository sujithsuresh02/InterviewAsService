import React from 'react'
import Addtimeslot from"../../Components/Admin/Addtimeslot/Addtimeslot"
import Sidebar from "../../Components/Admin/Dashboard/Sidebar"
export default function Timeslotpage() {
  return (
    <React.Fragment>
        <Sidebar allTables={ <Addtimeslot/>}/>
       
    </React.Fragment>
  )
}
