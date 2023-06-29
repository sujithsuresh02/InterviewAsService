import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { viewScheduledInterviews } from "../../../Features/Slices/Admin/Interviews";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Stack,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { cancelInterview } from "../../../Features/Slices/Admin/Interviews";
const Viewinterviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  console.log(theme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Data = useSelector(
    (state) => state?.interviews?.getallScheduledInterviews?.response
  );
  useEffect(() => {
    dispatch(viewScheduledInterviews());
  }, [dispatch, viewScheduledInterviews]);

  const handleClick = (interviewToken) => {
    navigate(`/meeting/${interviewToken}`);
  };

  const handleReschduleInterview = (interviewId) => {};

  const handleCancelInterview = (interviewId) => {
    console.log(interviewId);
    dispatch(cancelInterview({ interviewId: interviewId })).then((response) => {
      toast.success(response?.payload?.data?.message);
    });
  };


  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = Data?.slice((page - 1) * rowsPerPage,
  (page - 1) * rowsPerPage + rowsPerPage);
  return (
    <Box>
      <TableContainer sx={{ overflowX: "hidden" }}>
        <Typography
          variant="h5"
          position="relative"
          top="2rem"
          textAlign="center"
          sx={{ left: "35px" }}
        >
          View All Interviews
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            width: isSmallScreen ? "100%" : "100%",
            margin: "0 auto",
            border: "1px solid #ccc",
            marginTop: "3rem",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ background: "#f9f9f9" }}>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  CompanyName
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  StudentName
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  InterviewerName
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  JobRole
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  InterviewDate
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  InterviewTime
                </TableCell>

                <TableCell style={{ border: "1px solid #ccc" }}>
                  Action{" "}
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  meeting{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.length > 0 ? (
                paginatedData?.map((row) => (
                  <TableRow key={row.interview_id}>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.company_name}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.student_name}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.interviewer_name}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.jobRole}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.interview_date}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.interview_time}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancelInterview(row.interview_id)}
                      >
                        Cancel Interview
                      </Button>
                    </TableCell>
                   
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClick(row.interviewToken)}
                      >
                        Start Interview
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Box display={"flex"} justifyContent={"end"}>
                  <Typography variant="h6">
                    There Is No Scheduled Interviews
                  </Typography>
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainer>
      <Stack
        spacing={2}
        style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={Math.ceil(Data?.length / rowsPerPage)}
          shape="roundedpage"
          color="primary"
          variant="outlined"
          onChange={handleChangePage}
        />
      </Stack>
    </Box>
  );
};

export default Viewinterviews;
