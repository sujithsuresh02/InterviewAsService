import React from "react";
import Editprofile from "../../Components/Company/Profile/EditProfile";
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
import Profilesidebar from "../../Components/Company/Profile/ProfileSidebar";
export default function Editprofilepage() {
  return (
    <React.Fragment>
      <Header />
      <Profilesidebar pages={<Editprofile />} />
      <Footer/>
    </React.Fragment>
  );
}
