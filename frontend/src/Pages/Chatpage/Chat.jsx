




import React, { useRef, useState } from "react";
import ChatBox from "../../Components/Chat/Chatbox";
import Conversation from "../../Components/Chat/Conversation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";


import { getChats } from "../../Features/Slices/Chat/ChatSlice";
let Id = null;
let role = null;
let online = null;

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const client = useSelector((state) => state?.commonLogin?.loginDetails?.matchedAccount);
  const admin = useSelector((state) => state?.adminLogin?.loginDetails);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [clientRole, setclientRole] = useState(null);
  if (client?.role === "company") {
    Id = client?.id;
    role = client?.role;
  }
  if (admin.name === "admin") {
    Id = admin?.id;
    role = admin?.name;
  }

  useEffect(() => {
    socket.current = io("https://api.interviewxperts.online");
    socket.current.emit("new-user-add", Id);
    socket.current.on("get-users", (users) => {
      console.log(users,"socket users");
      setOnlineUsers(users);
    });

    socket.current.on("receive-message", (data) => {
      console.log("currentChat",data);
      setReceiveMessage(data);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [client, admin, receiveMessage]);

  useEffect(() => {
    if (sendMessage !== null) {
      console.log(sendMessage,"sendmessgae");
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  const getData = async () => {
    try {
      const response = await dispatch(getChats({ Id, role }));
      setChats(response?.payload?.chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(Id, role);
  }, [Id, role]);

  return (
    <>
      <div
        className="Chat"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "22% auto",
          gap: "1rem",
        }}
      >
        <div
          className="Left-side-chat"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            padding: "1rem 0rem 1rem 1rem",
          }}
        >
          <div
            className="Chat-container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              background: "rgba(255, 255, 255, 0.64)",
              borderRadius: "1rem",
              padding: "1rem",
              height: "auto",
              minHeight: "60vh",
              overflow: "scroll",
            }}
          >
            <h2>Chats</h2>
            <div
              className="Chat-list"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {chats?.map((chat) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                  key={chat?.id}
                >
                  <Conversation data={chat} online={online} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="Right-side-chat"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            padding: "1rem",
          }}
        >
          <ChatBox
            chat={currentChat}
            currentUser={Id}
            setSendMessage={setSendMessage}
            receivedMessage={receiveMessage}
            clientRole
          />
        </div>
      </div>
    </>
  );
};

export default Chat;


