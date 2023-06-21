import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelledInterviews } from "../../../Features/Slices/Admin/Interviews";
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
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const CancelledInterviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  console.log(theme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Data = useSelector(
    (state) => state?.interviews?.cancelledInterview?.result
  );
  console.log(Data);
  useEffect(() => {
    dispatch(cancelledInterviews());
  }, [dispatch, cancelledInterviews]);

  return (
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
                InterviewStatus
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.length > 0 ? (
              Data.map((row) => (
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
                    {row.interviewStatus}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography variant="h4">
                There Is No Cancelled Interviews
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableContainer>
  );
};

export default CancelledInterviews;
