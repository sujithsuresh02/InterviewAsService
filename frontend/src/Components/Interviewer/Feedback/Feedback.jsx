import React, { useEffect, useState } from "react";
import { Box, Button, Typography, styled,Stack,Pagination } from "@mui/material";
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
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StudentTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getAllScheduledInterviews());
  }, [getAllScheduledInterviews, dispatch]);
  
  const handleAddFeedback = (interviewId) => {
    navigate(`/interviewer/add_feedback/${interviewId}`);
  };
  
  const scheduledInterveiws = useSelector(
    (state) => state?.interviwer?.interviewerScheduledInterviews?.resposne
  );
  const handleStartMeeting = (interviewToken) => {
    navigate(`/meeting/${interviewToken}`);
  };

  
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = scheduledInterveiws?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  

  return (
    <Box>
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
          {paginatedData?.length > 0 ? (
            paginatedData?.map((interview) => (
              <StyledTableRow key={interview?.interview_id}>
                <StyledTableCell>{interview?.interview_id}</StyledTableCell>
                <StyledTableCell>{interview?.student_name}</StyledTableCell>
                <StyledTableCell>{interview?.jobRole}</StyledTableCell>
                <StyledTableCell>{interview?.studentEmail}</StyledTableCell>
                <StyledTableCell>{interview?.interview_time}</StyledTableCell>
                <StyledTableCell>{interview?.interview_date}</StyledTableCell>
                <TableCell>
                  <StyledButton
                    variant="contained"
                    onClick={() => handleStartMeeting(interview?.interviewToken)}
                  >
                    Join Meeting
                  </StyledButton>
                </TableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => handleAddFeedback(interview?.interview_id)}
                  >
                    Add Feedback
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={8}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Typography variant="h6" align="center">
                    There Is No Upcoming Interviews
                  </Typography>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
     <Stack
     spacing={2}
     style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
   >
     <Pagination
       count={Math.ceil(scheduledInterveiws?.length / rowsPerPage)}
       shape="roundedpage"
       color="primary"
       variant="outlined"
       onChange={handleChangePage}
     />
   </Stack>
   </Box>
  );
};

export default StudentTable;
