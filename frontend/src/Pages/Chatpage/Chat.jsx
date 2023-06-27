// import React, { useRef, useState } from "react";
// import ChatBox from "../../Components/Chat/Chatbox";
// import Conversation from "../../Components/Chat/Conversation";
// // import LogoSearch from "../../components/LogoSearch/LogoSearch";
// // import NavIcons from "../../components/NavIcons/NavIcons";
// import "./Chat.css";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { Box } from "@mui/material";
// import { getChats } from "../../Features/Slices/Chat/ChatSlice";
// let Id = null;
// let role = null;
// let online = null;

// const Chat = () => {
//   const dispatch = useDispatch();
//   const socket = useRef();
//   const client = useSelector(
//     (state) => state?.Login?.loginDetails?.matchedAccount
//   );
//   const admin = useSelector((state) => state?.adminLogin?.loginDetails);
//   console.log(client, "user", admin);

//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receiveMessage, setReceiveMessage] = useState(null);
//   const [clientRole, setclientRole] = useState(null);

//   if (client?.role === "company") {
//     Id = client?.id;
//     role = client?.role;
//   }
//   if (admin.name === "admin") {
//     Id = admin?.id;
//     role = admin?.name;
//   }
//   console.log("sdfgnmxcdf=============================>", Id);
//   useEffect(() => {
//     socket.current = io("http://localhost:5000");
//     socket.current.emit("new-user-add", Id);
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
//   }, [client, admin, receiveMessage]);

//   useEffect(() => {
//     if (sendMessage !== null) {
//       console.log(sendMessage,"???????????????????????????????/");
//       socket.current.emit("send-message", sendMessage);
//     }
//   }, [sendMessage]);

//   const getData = async () => {
//     try {
//       const response = await dispatch(getChats({ Id, role }));
//       console.log(response, "resposne");
//       setChats(response?.payload?.chats);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getData(Id, role);
//   }, [Id, role]);

//   // const checkOnlineStatus = (chats) => {
//   //   function getClientIdsForAdmin(Id) {
//   //     const clientIds = chats.filter((client) => client.adminId === Id).map((client) => client.clientId);
  
//   //     return clientIds;
//   //   }
  
//   //   const clientIdsArray = getClientIdsForAdmin(Id);
  
//   //   console.log(clientIdsArray, "clientarrays");
    
//   //   const online = onlineUsers?.find((user) => {
//   //     return clientIdsArray.includes(user.userId);
//   //   });
  
//   //   return online;
//   // };
// //  const  online=checkOnlineStatus(chats)
// //  console.log(online,"onlinesssssssssssssss");
//   return (
//     <>
//       <div className="Chat" style={{ marginTop: "6rem" }}>
//         {/* <Box m='2rem 0' /> */}

//         {/* Left Side */}
//         <div className="Left-side-chat">
//           <div className="Chat-container">
//             <h2>Chats</h2>
//             <div className="Chat-list">
//               {chats?.map((chat) => (
//                 // eslint-disable-next-line react/jsx-key
//                 <div
//                   onClick={() => {
//                     setCurrentChat(chat);
//                   }}
//                 >
//                   <Conversation data={chat}  />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}

//         <div className="Right-side-chat">
//           <ChatBox
//             chat={currentChat}
//             currentUser={Id}
//             setSendMessage={setSendMessage}
//             receivedMessage={receiveMessage}
//             clientRole
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chat;






import React, { useRef, useState } from "react";
import ChatBox from "../../Components/Chat/Chatbox";
import Conversation from "../../Components/Chat/Conversation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Box } from "@mui/material";
import { getChats } from "../../Features/Slices/Chat/ChatSlice";
let Id = null;
let role = null;
let online = null;

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const client = useSelector((state) => state?.Login?.loginDetails?.matchedAccount);
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
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", Id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("receive-message", (data) => {
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
                  key={chat.id}
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


