import React from "react";
import Chat from "./Chat";
import SideBar from "../../Components/Admin/Dashboard/Sidebar";
import Header from "../../Components/Common/Header/Header";
import { useSelector } from "react-redux";

export default function Chatpage() {
  const client = useSelector((state) => state?.Login?.loginDetails?.matchedAccount);
  const admin = useSelector((state) => state?.adminLogin?.loginDetails);

  return (
    <>
      {admin?.name === "admin" ? (
        <SideBar allTables={<Chat />} />
      ) : (
        <div>
          <Header/>
          <Chat />
        </div>
      )}
    </>
  );
}
