import React from 'react'
import Header from '../../Components/Common/Header/Header'
import HistoryPage from '../../Components/Company/Profile/TransctionHistory'
import Footer from '../../Components/Common/Footer/Footer'
import Profilesidebar from '../../Components/Company/Profile/ProfileSidebar'

export default function Transactionpage() {
  return (
 <React.Fragment>
<Header/>
<Profilesidebar pages={<HistoryPage/>}/>

<Footer/>
 </React.Fragment>
  )
}
