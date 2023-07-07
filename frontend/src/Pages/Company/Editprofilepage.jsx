import React from "react";
import Editprofile from "../../Components/Company/Profile/EditProfile";
import Header from "../../Components/Common/Header/Header";
import Footer from "../../Components/Common/Footer/Footer";
import Profilesidebar from "../../Components/Company/Profile/ProfileSidebar";
export default function Editprofilepage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          minHeight: "calc(100vh - 8rem)",
        }}
      >
        <Profilesidebar pages={<Editprofile />} />
      </div>
      <Footer />
    </div>
  );
}
