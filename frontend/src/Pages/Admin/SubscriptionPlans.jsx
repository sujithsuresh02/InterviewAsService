import React from 'react'

    import AddPlanForm from '../../Components/Admin/SubscriptionsPlans.jsx/Plans'
    import Sidebar from "../../Components/Admin/Dashboard/Sidebar"
export default function SubscriptionPlans() {
  return (
   <React.Fragment>
<Sidebar allTables={<AddPlanForm/>}/>

    </React.Fragment>

  )
}