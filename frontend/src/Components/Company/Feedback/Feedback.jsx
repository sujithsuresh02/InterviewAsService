import {
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewfeedback } from "../../../Features/Slices/companySlice/companySlice";
import whyIV5 from "../../../Images/whyIV5.svg"
import { saveAs } from "file-saver";
export default function Feedback() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    dispatch(getInterviewfeedback());
  }, [dispatch]);

  const feedbackDetails = useSelector((state) => state?.addrequest?.feedback);

  useEffect(() => {
    const matchItem = feedbackDetails?.filter(
      (feedback) => Number(feedback.studentId) === Number(studentId)
    );
    setFeedback(matchItem[0]);
  }, [feedbackDetails, studentId]);
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:5173/pdf");
      console.log(response);
      const pdfBlob = await response.blob();
      saveAs(pdfBlob, "feedbackreport.pdf");
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };


  return (
    <Box marginTop={"10rem"}>
      <Grid container>
        <Grid item xs={12} sm={12} md={3}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5">Personal Information</Typography>
          </Box>
          <Box>
            <Typography variant="body1" textAlign="center">
              Name: {feedback?.name}
            </Typography>
            <Typography variant="body1" textAlign="center">
              Email: {feedback?.email}
            </Typography>
            <Typography variant="body1" textAlign="center">
              Phone Number: {feedback?.phone}
            </Typography>
          </Box>
        </Grid>
        <Divider
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          sx={{
            height: isSmallScreen ? "0px" : "500px",
            backgroundColor: "black",
          }}
        />
        <Grid item xs={12} sm={12} md={4}>
          <Box mt={isSmallScreen && 3}>
            <Typography variant="h5" textAlign="center" fontWeight="600">
              Feedback Details
            </Typography>
          </Box>
          <Box mt={4} display="flex" justifyContent="space-evenly">
            <Typography variant="body1" textAlign="center">
              Technical Score: {feedback?.technicalScore} / 10
            </Typography>
            <Typography variant="body1" textAlign="center">
              Coding Score: {feedback?.codingScore} / 10
            </Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="space-evenly">
            <Typography variant="body1" textAlign="center">
              Communication Score: {feedback?.communicationScore} / 10
            </Typography>
            <Typography variant="body1" textAlign="center">
              Total Score: {feedback?.TotalInterviewScore} / 10
            </Typography>
          </Box>
          <Box mt={2}>
            {feedback.feedbackStatus === "strong proceed" ? (
              <Typography variant="body1" textAlign="center">
                Interview Status:{" "}
                <Typography variant="body1" color="green">
                  {feedback.feedbackStatus}
                </Typography>
              </Typography>
            ) : feedback.feedbackStatus === "proceed" ? (
              <Typography variant="body1" textAlign="center">
                Interview Status:{" "}
                <Typography variant="body1" color="lightGreen">
                  {feedback.feedbackStatus}
                </Typography>
              </Typography>
            ) : feedback.feedbackStatus === "strong reject" ? (
              <Typography variant="body1" textAlign="center">
                Interview Status:{" "}
                <Typography variant="body1" color="orange">
                  {feedback.feedbackStatus}
                </Typography>
              </Typography>
            ) : (
              <Typography variant="body1" textAlign="center">
                Interview Status:{" "}
                <Typography variant="body1" color="red">
                  {feedback.feedbackStatus}
                </Typography>
              </Typography>
            )}
          </Box>
          <Box mt={2}>
            <Typography variant="h6" textAlign="start" marginLeft="30px">
              Detailed Feedback
              <br />
              <Divider />
              <Typography variant="body1">
                {feedback?.feedbackDescription}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box display="flex" justifyContent="end">
            <Button
              variant="outlined"
            onClick={handleDownload}
              color="inherit"
            >
              Feedback Report
            </Button>
          </Box>
          <img
            src={whyIV5}
            style={{ marginTop: "4rem", maxHeight: "100%", maxWidth: "100%" }}
            alt=""
          />
        </Grid>
      </Grid>
    </Box>
  );
}
