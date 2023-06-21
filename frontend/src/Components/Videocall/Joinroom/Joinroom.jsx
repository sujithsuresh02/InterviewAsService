import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import "./Style.css";
function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    roomCode: ""
  });

  const validRoomCodes = ["room1", "room2", "room3"]; // Example array of valid room codes

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };
  const isValidRoomCode = (roomCode) => {

    return validRoomCodes.includes(roomCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify the room code input before joining the room
    if (isValidRoomCode(inputValues.roomCode)) {
      try {
        // Room code is valid, fetch the authentication token
       const response = await fetch(`${"https://prod-in2.100ms.live/hmsapi/sujith-videoconf-1919.app.100ms.live/"}api/token`, {
          method: "POST",
          body: JSON.stringify({
            user_id: `${Date.now()}`,
            role: "host",
            type: "app",
            room_id: "647f39509a6d55c39b2e8efa"
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const { token } = await response.json();
          console.log(token);

          // Joining the room with the obtained authentication token
          hmsActions.join({
            userName: inputValues.name,
            authToken: token
          });
        } else {
          console.log("Error fetching authentication token");
        }
      } catch (error) {
        console.log("Error occurred during API call:", error);
      }
    } else {
      // Invalid room code, display an error message or take appropriate action
      console.log("Invalid room code");
    }
  };



  return (
    <form className="join" onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div>
      <div className="input-container">
        <input
          required
          value={inputValues.roomCode}
          onChange={handleInputChange}
          id="room-code"
          type="text"
          name="roomCode"
          placeholder="Room code"
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
