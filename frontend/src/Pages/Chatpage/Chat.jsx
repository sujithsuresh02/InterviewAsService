import React, { useRef, useState } from "react";
import ChatBox from "../../Components/Chat/Chatbox";
import Conversation from "../../Components/Chat/Conversation";
// import LogoSearch from "../../components/LogoSearch/LogoSearch";
// import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Box } from "@mui/material";
import { getchats } from "../../Features/Slices/Chat/ChatSlice";
let Id = null;
let role = null;
const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const client = useSelector(
    (state) => state?.Login?.loginDetails?.matchedAccount
  );
  const admin = useSelector((state) => state?.adminLogin?.loginDetails);
  console.log(client, "user", admin);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // Send Message to socket server

  // Connect to Socket.io
  //   useEffect(() => {
  //     socket.current = io("http://localhost:5000");
  //     socket.current.emit("new-user-add", user._id);
  //     socket.current.on("get-users", (users) => {
  //       setOnlineUsers(users);
  //     });

  //     socket.current.on("receive-message", (data) => {
  //       setReceiveMessage(data);
  //     });

  //     return () => {
  //       if (socket.current) {
  //         socket.current.disconnect();
  //       }
  //     };
  //   }, [user, receiveMessage]);
  //   useEffect(() => {
  //     if (sendMessage !== null) {
  //       socket.current.emit("send-message", sendMessage);
  //     }
  //   }, [sendMessage]);

  if (client?.role === "comapny") {
    Id = client?.id;
    role = client?.role;
  }
  if (admin.name === "admin") {
    Id = admin?.id;
    role = admin?.name;
  }
  useEffect(async () => {
    const response = await dispatch(getchats({ Id, role }));
    console.log(response, "resposne");
    setChats(response);
  }, [Id, role]);

  //   const checkOnlineStatus = (chat) => {
  //     const chatMember = chat.members.find((member) => member !== user._id);
  //     const online = onlineUsers.find((user) => user.userId === chatMember);
  //     return online ? true : false;
  //   };

  return (
    <>
      <div className="Chat" style={{ marginTop: "6rem" }}>
        {/* <Box m='2rem 0' /> */}

        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation data={chat} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <ChatBox
          // chat={currentChat}
          // currentUser={user._id}
          // setSendMessage={setSendMessage}
          // receivedMessage={receiveMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
