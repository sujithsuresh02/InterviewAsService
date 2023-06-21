import React from 'react'
import EditPlans from '../../Components/Admin/SubscriptionsPlans/Editplans'
import Sidebar from "../../Components/Admin/Dashboard/Sidebar"
export default function EditplansPage() {
  return (
   <React.Fragment>
    <Sidebar allTables={<EditPlans/>}/>
   </React.Fragment>
  )
}
