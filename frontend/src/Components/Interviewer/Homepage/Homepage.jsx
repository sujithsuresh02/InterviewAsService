import React from 'react';
import { Grid, styled, Box, Typography, Button, TextField, Paper } from "@mui/material";
import * as Yup from 'yup';

const Homepage = () => {
  const StyledContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6rem",
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

  const StyledTextField = styled(TextField)({
    width: "100%",
    marginBottom: "1rem",
  });

  const validationSchema = Yup.object().shape({
    meetingID: Yup.string().required("Meeting ID is required"),
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
  };

  const todaysInterviews = [
    { id: 1, date: "June 6", time: "10:00 AM", title: "Interview 1", student: "John Doe" },
    { id: 2, date: "June 6", time: "11:30 AM", title: "Interview 2", student: "Jane Smith" },
    { id: 3, date: "June 6", time: "2:00 PM", title: "Interview 3", student: "Michael Johnson" },
    { id: 4, date: "June 6", time: "4:30 PM", title: "Interview 4", student: "Emily Davis" },
    { id: 5, date: "June 6", time: "6:00 PM", title: "Interview 5", student: "David Wilson" },
    { id: 6, date: "June 6", time: "7:30 PM", title: "Interview 6", student: "Sarah Brown" },
    { id: 7, date: "June 6", time: "9:00 PM", title: "Interview 7", student: "Alex Johnson" },
  ];

  return (
    <Grid container bgcolor="#f8f9fa">
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <StyledContainer>
          <JoinMeetingMessage>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", lineHeight: "45px" }}>
              Welcome! Please click <br />the button below to <br />join the meeting.
            </Typography>
          </JoinMeetingMessage>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              label="Meeting ID"
              variant="outlined"
              size="small"
              name="meetingID"
              placeholder="Enter the meeting ID"
              validateOnChange={false}
              validateOnBlur={true}
              error={false} // Pass your validation error state here
              helperText="" // Pass your validation error message here
            />
            <Button variant="contained" type="submit" mt={2} fullWidth>
              Join Meeting
            </Button>
          </form>
        </StyledContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Paper sx={{ width: "80%", height: "500px", marginTop: "8rem", borderRadius: "15px", backgroundColor: "#e0e0e0" }}>
            <Typography variant="h6" textAlign="center" mt={5}>
              Today's Interviews
            </Typography>
            <Box p={2}>
              {todaysInterviews.slice(0, 3).map((interview) => (
                <Box key={interview.id} p={2} borderBottom="1px solid rgba(0, 0, 0, 0.1)" display="flex" alignItems="center">
                  <Box>
                    <Typography variant="subtitle1">{interview.date}</Typography>
                    <Typography variant="h6">{interview.time}</Typography>
                  </Box>
                  <Box flexGrow={1} ml={2}>
                    <Typography variant="body1">{interview.title}</Typography>
                    <Typography variant="body2">{interview.student}</Typography>
                  </Box>
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </Box>
              ))}
              
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Homepage;
