import React from 'react'
import Sidebar from '../../Components/Admin/Dashboard/Sidebar'
import AdminDashboard from '../../Components/Admin/Dashboard/Dashboard'
export default function Dashboard() {
  return (
    <React.Fragment>
        <Sidebar allTables={<AdminDashboard/>}/>
    </React.Fragment>
  )
}
