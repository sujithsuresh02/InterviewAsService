import React from 'react'
import Student from '../../Components/Admin/Studentdetails/Students'
import Sidebar from "../../Components/Admin/Dashboard/Sidebar"
export default function Viewstudentsdetails() {
  return (
    <React.Fragment>
        <Sidebar/>
        <Student/>
    </React.Fragment>
  )
}
