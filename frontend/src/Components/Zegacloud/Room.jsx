import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APPID, serverSecret } from "./Zegocloudkeys";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateInterviewToken } from "../../Features/Slices/Admin/Interviews";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const appId = Number(APPID);

export default function Room() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const { interviewToken } = useParams();
  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    dispatch(validateInterviewToken(interviewToken)).then((resposne) => {
      let token = resposne?.payload?.data?.interviewtoken;
      if (token) {
        setRoomId(token);
      } else {
        setRoomId("");
      }
    });
  }, [interviewToken]);

  const meeting = () => {
    if (roomId !== "") {
      const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        randomID(5),
        randomID(5)
      );
      const zc = ZegoUIKitPrebuilt.create(token);
      zc?.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: true,
      });
    } else {
      console.log("Invalid Link!");
    }
  };
  return <div style={{ width: "100vw", height: "100vh" }} ref={meeting}></div>;
}
