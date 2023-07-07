import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { savePDF } from "@progress/kendo-react-pdf";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import Logo from "../../Images/interviewXpertslogo.png";
import { getInterviewfeedback } from "../../Features/Slices/companySlice/companySlice";

const Container = styled("div")({
  backgroundColor: "#f0f0f0",
  padding: "40px",
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
  alignContent:"center"
});

const LogoImage = styled("img")({
  width: "200px",
  height: "100px",
  marginRight: "10px",
});

const CompanyName = styled("h3")({});

const Section = styled("div")({
  marginBottom: "20px",
});

const SubHeading = styled("h2")({
  fontWeight: "bold",
  marginBottom: "10px",
});

const FeedbackHeading = styled("h1")({
  fontWeight: "bold",
  textAlign: "center",
});

const Pdf = () => {
const dispatch=useDispatch()
const [feedback, setFeedback] = useState(null)
  useEffect(() => {
    dispatch(getInterviewfeedback());
  }, [dispatch,getInterviewfeedback]);

  const Feedback = useSelector((state) => state?.addrequest?.feedback);
console.log(feedback,"fed");

useEffect(() => {
  const matchItem = FeedbackDetails?.filter(
    (feedback) => Number(feedback.studentId) === Number(studentId)
  );
  setFeedback(matchItem[0]);
}, [feedbackDetails, studentId]);
  // const handleDownloadPDF = () => {
  //   const container = document.getElementById("feedback-page");
  //   savePDF(container, { paperSize: "A4" });
  // };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container id="feedback-page">
      <Header>
        <LogoImage src={Logo} alt="Company Logo" />
        <Box>
          <h3>InterviewXperts Pvt</h3>
          <h3> Palakkad,Kerala</h3>
          <h3>Pincode :678543</h3>
          <h3>Email :interviewxperts@gmail.com</h3>
        </Box>
      </Header>
      <Divider sx={{backgroundColor:"black"}}/>

      <FeedbackHeading>Interview Feedback Report</FeedbackHeading>

      <Grid container>
        <Grid item xs={12} sm={12} md={2}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5">Student Details</Typography>
          </Box>
          <Box >
            <Typography variant="h6" textAlign="strat" lineHeight={3}>
              Name: {feedback?.name}
            </Typography>
            <Typography variant="h6" textAlign="start"lineHeight={3}>
              Email: {feedback?.email}
            </Typography>
            <Typography variant="h6" textAlign="start" lineHeight={3}>
              Phone Number: {feedback?.phone}
            </Typography>
            <Typography variant="h6" textAlign="start" lineHeight={3}>
              Role: {feedback?.phone}
            </Typography>
            <Typography variant="h6" textAlign="start" lineHeight={3}>
              Address: {feedback?.phone}
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
        <Grid item xs={12} sm={12} md={5}>
          <Box mt={4} display="flex" justifyContent="space-evenly">
            <Typography variant="h5" textAlign="center">
              Technical Score: {feedback?.technicalScore} / 10
            </Typography>
            <Typography variant="h5" textAlign="center">
              Coding Score: {feedback?.codingScore} / 10
            </Typography>
          </Box>
          <Box mt={7} display="flex" justifyContent="space-evenly">
            <Typography variant="h5" textAlign="center">
              Communication Score: {feedback?.communicationScore} / 10
            </Typography>
            <Typography variant="h5" textAlign="center">
              Total Score: {feedback?.TotalInterviewScore} / 10
            </Typography>
          </Box>
          <Box mt={7}>
            {feedback?.feedbackStatus === "strong proceed" ? (
              <Typography variant="h6" textAlign="center">
                Interview Status:{" "}
                <Typography variant="h6" color="green">
                  {feedback.feedbackStatus}
                </Typography>
              </Typography>
            ) : feedback?.feedbackStatus === "proceed" ? (
              <Typography variant="h6" textAlign="center">
                Interview Status:{" "}
                <Typography variant="h6" color="lightGreen">
                  {feedback.feedbackStatus}
                </Typography>
              </Typography>
            ) : feedback?.feedbackStatus === "strong reject" ? (
              <Typography variant="h5" textAlign="center">
                Interview Status:{" "}
                <Typography variant="h6" color="orange">
                  {feedback?.feedbackStatus}
                </Typography>
              </Typography>
            ) : (
              <Typography variant="h5" textAlign="center">
                Interview Status:{" "}
                <Typography variant="h6" color="red">
                  {feedback?.feedbackStatus}
                </Typography>
              </Typography>
            )}
          </Box>
          <Box mt={10}>
            <Typography variant="h5" textAlign="start" marginLeft="30px">
              Detailed Feedback
              <br />
              <Divider sx={{ backgroundColor: "black", fontWeight: "bold" }} />
              <Typography variant="body1">
                {feedback?.feedbackDescription}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <img
            src="https://interviewvector.com/images/services/whyIV5.svg"
            style={{ marginTop: "3rem", height: "400px", width: "800px" }}
            alt=""
          />
        </Grid>
      </Grid>
      {/* <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </Box> */}
        <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: 'Arial' }}>
        © {new Date().getFullYear()} interviewXperts.com All rights reserved.
      </Typography>
    </Container>
  );
};

export default Pdf;
