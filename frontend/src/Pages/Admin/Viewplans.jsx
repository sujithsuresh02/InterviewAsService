import React from 'react'
import SideBar from '../../Components/Admin/Dashboard/Sidebar'
import Viewplans from '../../Components/Admin/SubscriptionsPlans.jsx/Viewplans'
export default function ViewSubscriptionPlans() {
  return (
   <>
   <SideBar  allTables={<Viewplans/>}/>
   </>
  )
}
