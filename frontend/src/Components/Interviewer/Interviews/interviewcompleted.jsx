import React, { useEffect, useState } from "react";
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
  Box,
  Stack,
  Pagination
} from "@mui/material";
import { completedInterviews } from "../../../Features/Slices/Interviewer/Interviewer";
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: "70%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
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

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = completedinterviews?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  
  
  return (
    <Box>
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
          {paginatedData ? (
            paginatedData?.map((interview) => (
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
      <Stack
      spacing={2}
      style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
    >
      <Pagination
        count={Math.ceil(completedinterviews?.length / rowsPerPage)}
        shape="roundedpage"
        color="primary"
        variant="outlined"
        onChange={handleChangePage}
      />
    </Stack>
    </Box>
  );
};

export default InterviewesTable;
