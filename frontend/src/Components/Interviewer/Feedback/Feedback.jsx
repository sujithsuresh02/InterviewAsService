import React, { useEffect } from "react";
import { Button, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import { getAllScheduledInterviews } from "../../../Features/Slices/Interviewer/Interviewer";

const StyledTableContainer = styled(TableContainer)({
  maxWidth: "100%",
  marginTop: "9rem",
  height:"80vh"
});

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "gray",
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: 16,
  border: "1px solid #ddd",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  border: "1px solid #ddd",
}));

const StyledTableCell = styled(TableCell)({
  border: "1px solid #ddd",
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StudentTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scheduledInterveiws = useSelector(
    (state) => state?.interviwer?.interviewerScheduledInterviews?.resposne
  );

  useEffect(() => {
    dispatch(getAllScheduledInterviews());
  }, [getAllScheduledInterviews, dispatch]);

  const handleAddFeedback = (interviewId) => {
    navigate(`/interviewer/add_feedback/${interviewId}`);
  };


  const handleStartMeeting=(interviewToken)=>{
  navigate(`/meeting/${interviewToken}`)
  }
  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h4" textAlign={"center"}>
      Upcoming Interviews
      </Typography>
      <Table sx={{ marginTop: "2rem" }}>
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>InterviwewId</StyledTableHeaderCell>
            <StyledTableHeaderCell>StudentName</StyledTableHeaderCell>
            <StyledTableHeaderCell>JobRole</StyledTableHeaderCell>
            <StyledTableHeaderCell>StydentEmail</StyledTableHeaderCell>
            <StyledTableHeaderCell>InterviewTime</StyledTableHeaderCell>
            <StyledTableHeaderCell>InterviewDate</StyledTableHeaderCell>
            <StyledTableHeaderCell>Meeting</StyledTableHeaderCell>
            <StyledTableHeaderCell>Feeedback</StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduledInterveiws &&
            scheduledInterveiws.map((interview) => (
              <StyledTableRow key={interview.interview_id}>
                <StyledTableCell>{interview.interview_id}</StyledTableCell>
                <StyledTableCell>{interview.student_name}</StyledTableCell>
                <StyledTableCell>{interview.jobRole}</StyledTableCell>
                <StyledTableCell>{interview.studentEmail}</StyledTableCell>
                <StyledTableCell>{interview.interview_time}</StyledTableCell>
                <StyledTableCell>{interview.interview_date}</StyledTableCell>
                <TableCell>
                <StyledButton variant="contained" onClick={() => handleStartMeeting(interview.interviewToken)}>
                 Join Meeting
                </StyledButton>
              </TableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => handleAddFeedback(interview.interview_id)}
                  >
                    Add Feedback
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default StudentTable;
