import React from "react";
import Chat from "./Chat";
import SideBar from "../../Components/Admin/Dashboard/Sidebar";
import Header from "../../Components/Common/Header/Header";
import { useSelector } from "react-redux";

export default function Chatpage() {
  const client = useSelector((state) => state?.commonLogin?.loginDetails?.matchedAccount);
  const admin = useSelector((state) => state?.adminLogin?.loginDetails);
  console.log(admin, client, "chatsssssssssssssssssssss");

  if (admin?.name === "admin") {
    return (
      <SideBar allTables={<Chat />} />
    );
  }

  return (
    <div>
      <Header />
      { <Chat />}
    </div>
  );
}
