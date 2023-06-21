import React from 'react'
import Header from '../../Components/Common/Header/Header'
import Profilesidebar from '../../Components/Company/Profile/ProfileSidebar'
import ResetPassword from '../../Components/Company/Profile/Resetpassword'
export default function ResetpasswordPage() {
  return (
   <React.Fragment>
    <Header/>
    <Profilesidebar pages={<ResetPassword/>}/>
   </React.Fragment>
  )
}

