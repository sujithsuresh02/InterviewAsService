/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useRef } from "react";
import "./chatbox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  createMessage,
  getMessage,
} from "../../Features/Slices/Chat/ChatSlice";
let Id = null;
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const dispatch = useDispatch();
  const client = useSelector(
    (state) => state?.commonLogin?.loginDetails?.matchedAccount
  );
  const admin = useSelector((state) => state?.adminLogin?.loginDetails);
  console.log(currentUser, "currentuser");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  console.log(receivedMessage,"recievedMessages");
  console.log(chat, "in chatbox");
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat?.id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  useEffect(() => {
    setUserData(chat);
  }, [chat]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log(chat, "chat.id");
        const data = await dispatch(getMessage(chat?.id));
        console.log(data, " get data");
        setMessages(data?.payload?.messages);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      return;
    }
    console.log("handle enter ");
    const message = {
      senderId: currentUser,
      message: newMessage,
      chatId: chat.id,
    };
    console.log(message, "message");
    console.log(chat, "chatboxchat");
    if (client?.role === "company") {
      Id = chat?.adminId;
    }
    if (admin?.name === "admin") {
      Id = chat.clientId;
    }
    const receiverId = Id;
    console.log(message, "from chatbox");
    setSendMessage({ ...message, receiverId });
    try {
      const data = await dispatch(createMessage(message));

      console.log(data, "create data");

      setMessages([...messages, data?.payload?.messages]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  const scroll = useRef();
  // const imageRef = useRef();
  console.log(messages, "messages");
  return (
    <>
      <div className="ChatBox-container" style={{ height: "70vh" }}>
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <image size="55px" />
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="500"
                      sx={{ padding: "1rem" }}
                    >
                      {userData?.name}
                    </Typography>
                  </Box>
                  <Box></Box>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
              </div>
            </div>
            <div className="chat-body">
              {messages &&
                messages?.map((message) => (
                  <div
                    ref={scroll}
                    className={
                      message?.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                    key={message?.id}
                  >
                    <>
                      <span>{message?.message}</span>
                      <span>{format(message?.timestamp)}</span>
                    </>
                  </div>
                ))}
            </div>
            <div className="chat-sender">
              <div></div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button
                className={`send-button button ${
                  !newMessage.trim() ? "disabled" : ""
                }`}
                disabled={!newMessage.trim()}
                onClick={handleSend}
              >
                Send
              </button>
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">Tap a chat to start</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
