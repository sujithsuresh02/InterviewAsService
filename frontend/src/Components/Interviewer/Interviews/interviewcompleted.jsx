import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate}  from "react-router-dom"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { completedInterviews } from "../../../Features/Slices/Interviewer/Interviewer";
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "70%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  height:"80vh"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const InterviewesTable = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const completedinterviews = useSelector(
    (state) => state?.interviwer?.completedInterveiws?.result
  );
  useEffect(() => {
    dispatch(completedInterviews()).then((response) => {
      console.log(response, "inncompletedpage");
    });
  }, [dispatch, completedInterviews]);


  const handleAddFeedback=(interviewId)=>{
   navigate(`/interviewer/editFeedback/${interviewId}`)
  }
  
  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h5" textAlign="center">
        Completed  Interviews
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Interview ID</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Job Role</TableCell>
            <TableCell>Student Email</TableCell>
            <TableCell>Interview Time</TableCell>
            <TableCell>Interview Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedinterviews ? (
            completedinterviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>{interview.interview_id}</TableCell>
                <TableCell>{interview.student_name}</TableCell>
                <TableCell>{interview.jobRole}</TableCell>
                <TableCell>{interview.studentEmail}</TableCell>
                <TableCell>{interview.interview_time}</TableCell>
                <TableCell>{interview.interview_date}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAddFeedback(interview.interview_id)}
                  >
                    Edit Feedback
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <h6>There No Completd Interveiws </h6>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default InterviewesTable;
