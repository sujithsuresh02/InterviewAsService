import React, { useEffect } from "react";
import {
  Grid,
  styled,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { homepageInterviewListing } from "../../../Features/Slices/Interviewer/Interviewer";
const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Todaysinterview = useSelector(
    (state) => state?.interviwer?.datewiseInterviews?.response
  );
  console.log(Todaysinterview, "bccvc");
  const StyledContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
    height: "70vh",
    flexDirection: "column",
  }));

  const JoinMeetingMessage = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    margin: "1rem 0",
    borderRadius: "4px",
  }));

  useEffect(() => {
    dispatch(homepageInterviewListing());
  }, [homepageInterviewListing]);

  const handleSubmit = (values) => {
    navigate("/interviewer/feedback");
  };


  const handleViewDetails=()=>{
     navigate('/interviewer/feedback')
  }
  return (
    <Grid container bgcolor="#f8f9fa">
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <StyledContainer>
          <JoinMeetingMessage>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", lineHeight: "45px" }}
            >
              Welcome! Please click <br />
              the button below to <br />
              join the meeting.
            </Typography>
          </JoinMeetingMessage>

          <Box marginRight={5}>
            <Button variant="contained" onClick={handleSubmit} mt={2} fullWidth>
              Join Meeting
            </Button>
          </Box>
        </StyledContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Paper
            sx={{
              width: "80%",
              height: "500px",
              marginTop: "8rem",
              borderRadius: "15px",
              backgroundColor: "#e0e0e0",
            }}
          >
            <Typography variant="h6" textAlign="center" mt={5}>
              Today's Interviews
            </Typography>
            <Box p={2}>
              {Todaysinterview?.length>0?
                Todaysinterview?.slice(0, 5).map((interview) => (
                  <Box
                    key={interview.id}
                    p={2}
                    borderBottom="1px solid rgba(0, 0, 0, 0.1)"
                    display="flex"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="subtitle1">
                        {interview.interview_date}
                      </Typography>
                      <Typography variant="h6">
                        {interview.interview_time}
                      </Typography>
                    </Box>
                    <Box flexGrow={1} ml={2}>
                      <Typography variant="body2">
                        {interview.student_name}
                      </Typography>
                    </Box>
                    <Box flexGrow={1} ml={2}>
                      <Typography variant="body2">
                        {interview.jobRole}
                      </Typography>
                    </Box>
                    <Button variant="outlined" onClick={handleViewDetails} size="small">
                      View Details
                    </Button>
                  </Box>
                )):
                <Typography variant="h6" textAlign={"center"} alignItems={"center"}>There Is No Interviews For Today</Typography>}
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Homepage;
