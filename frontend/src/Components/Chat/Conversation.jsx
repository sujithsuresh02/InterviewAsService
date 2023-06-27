// /* eslint-disable react/prop-types */
// import { Box, Typography } from "@mui/material";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const Conversation = ({ data, online }) => {
//   const [userData, setUserData] = useState(null);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
  
//         setUserData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getUserData();
//   }, []);
//   return (
//     <>
//       <div className='follower conversation'>
//         <div>
//           {online && <div className='online-dot'></div>}
//           <div style={{ display: "flex", justifyContent: "space-around" }}>
//             {/* <UserImage image={userData?.displayPicture} size='55px' /> */}
//             <Box>
//               <Typography variant='h5' fontWeight='500'>
//                 {userData?.name}
//               </Typography>
//               <Typography fontSize='0.75rem'>
//                 {online ? "Online" : "Offline"}
//               </Typography>
//             </Box>
//             <Box></Box>
//           </div>
//           {/* <img
//             src={userData?.displayPicture ? `http://localhost:5000/uploads/${userData.displayPicture}` : "/assets/150-1503945_transparent-user-png-default-user-image-png-png (1).png"}
//             alt="Profile"
//             className="followerImage"
//             style={{ width: "50px", height: "50px" }}
//           /> */}
//         </div>
//       </div>
//       <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
//     </>
//   );
// };

// export default Conversation;



import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Conversation = ({ data, online }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserData = async () => {
      try {
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div
        className="Conversation follower"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "10px",
          borderRadius: "0.5rem",
          border: "1px solid #ececec", // Added border style
        }}
      >
        <div>
          {online && (
            <div
              className="Online-dot"
              style={{
                backgroundColor: "greenyellow",
                borderRadius: "50%",
                width: "1rem",
                height: "1rem",
              }}
            ></div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="500">
                {userData?.name}
              </Typography>
              <Typography fontSize="0.75rem">
                {online ? "Online" : "Offline"}
              </Typography>
            </Box>
            <Box></Box>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "85%",
          border: "0.1px solid #ececec",
        }}
      />
    </>
  );
};

export default Conversation;
