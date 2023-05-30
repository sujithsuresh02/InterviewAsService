
import React from 'react'
import Header from '../../Components/Common/Header/Header'
import Landingpage from"../../Components/Common/Landing-Page/Landingpage"
import Footer from '../../Components/Common/Footer/Footer'
import Secondpage from"../../Components/Common/Landing-Page/DownLanding"
export default function Landingpages() {
  return (
    <React.Fragment>
        <Header/>
        <Landingpage/>
        <Secondpage/>
         <Footer/>
    </React.Fragment>
  )
}
