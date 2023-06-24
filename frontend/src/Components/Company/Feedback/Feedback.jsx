import { Box, Grid, Typography, Divider, Button,useTheme,useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewFeedback } from "../../../Features/Slices/companySlice/companySlice";
export default function Feedback() {

  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [feedback, setfeedback] = useState({});
  useEffect(() => {
    dispatch(getInterviewFeedback());
  }, []);
  console.log(studentId, "studentId");
  const feedbackDetails = useSelector((state) => state?.addrequest?.feedback);
  console.log(feedbackDetails, "feedbackDetails");
  useEffect(() => {
    const matchItem = feedbackDetails?.filter(
      (feedbackDetails) => {
        return Number(feedbackDetails.studentId) === Number(studentId);
      },
      [feedbackDetails, studentId]
    );
    setfeedback(matchItem[0]);
  });
  console.log(feedback, "feedback");
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={3}>
          <Box>
            <Typography variant="h5" textAlign={"center"}>
              Personal Information
            </Typography>
          </Box>
          <Box marginTop={"1.5rem"}>
            <Typography variant="body1" textAlign={"center"}>
              Name:{feedback?.name}
            </Typography>
          </Box>
          <Box marginTop={"1.5rem"}>
            <Typography variant="body1" textAlign={"center"}>
              Email:{feedback?.email}
            </Typography>
          </Box>
          <Box marginTop={"1.5rem"}>
            <Typography variant="body1" textAlign={"center"}>
              Phone Number:{feedback?.phone}
            </Typography>
          </Box>
        </Grid>
        <Divider
          orientation= {isSmallScreen?"horizontal":"vertical"}
          sx={{ height: isSmallScreen?"0px":"500px", backgroundColor: "black" }}
        />
        <Grid item xs={12} sm={12} md={4} height="100%">
          <Box marginTop={isSmallScreen &&"3rem"}>
            <Typography variant="h5" textAlign={"center"} fontWeight={"600"}>
              Feedback Details
            </Typography>
          </Box>
          <Box
            marginTop={"4rem"}
            display={"flex"}
            justifyContent={"space-evenly"}
          >
            <Typography variant="body1" textAlign={"center"}>
              Techanical Score :{feedback?.technicalScore} /10
            </Typography>
            <Typography variant="body1" textAlign={"center"}>
              Coding Score :{feedback?.codingScore} /10
            </Typography>
          </Box>

          <Box
            marginTop={"2rem"}
            display={"flex"}
            justifyContent={"space-evenly"}
          >
            <Typography variant="body1" textAlign={"center"}>
              Communication Score : {feedback?.communicationScore}/10
            </Typography>
            <Typography variant="body1" textAlign={"center"}>
              Total Score :{feedback?.TotalInterviewScore}/10
            </Typography>
          </Box>
          <Box marginTop={"2rem"}>
            {feedback.feedbackStatus === "strong proceed" ? (
             <Typography variant="body1" textAlign="center">
             InterviewStatus: <Typography variant="body1" color="green">{feedback.feedbackStatus}</Typography>
           </Typography>
            ) : feedback.feedbackStatus === "proceed" ? (
              <Typography variant="body1" textAlign="center">
              InterviewStatus: <Typography variant="body1" color="lightGreen">{feedback.feedbackStatus}</Typography>
            </Typography>
            ) : feedback.feedbackStatus === "strong reject" ? (
              <Typography variant="body1" textAlign="center">
              InterviewStatus: <Typography variant="body1" color="orange">{feedback.feedbackStatus}</Typography>
            </Typography>
            ) : (
              <Typography variant="body1" textAlign="center">
              InterviewStatus: <Typography variant="body1" color="red">{feedback.feedbackStatus}</Typography>
            </Typography>
            )}
          </Box>

          <Box marginTop={"2rem"}>
            <Typography variant="h6" textAlign={"start"} marginLeft="30px">
              Detailed Feedback <br />
              <Divider />
              <Typography variant="body1">
                {feedback?.feedbackDescription}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="outlined" color="inherit">
              Feedback Report
            </Button>
          </Box>

          <img
  src="https://interviewvector.com/images/services/whyIV5.svg"
  style={{ marginTop: "4rem", maxHeight: "100%", maxWidth: "100%" }}
  alt=""
/>
        </Grid>
      </Grid>
    </Box>
  );
}
