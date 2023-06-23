import React from "react";
import SubscriptionTable from "../../Components/Admin/Subscriptionshistory/Paymenthistory";
import SideBar from "../../Components/Admin/Dashboard/Sidebar";
export default function Paymenthistorypage() {
  return (
    <React.Fragment>
      <SideBar allTables={<SubscriptionTable />} />
    </React.Fragment>
  );
}
