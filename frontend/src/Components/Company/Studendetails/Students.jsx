import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
  Grid,
  Typography,
  styled,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import "./Style.css";
import {useNavigate} from "react-router-dom"
import { getInterviewFeedback } from "../../../Features/Slices/companySlice/companySlice";

const Students = () => {
  const dispatch = useDispatch();
 const navigate=useNavigate()
  const studentDetails = useSelector((state) => state?.addrequest?.feedback);
  console.log(studentDetails, "student");

  useEffect(() => {
    dispatch(getInterviewFeedback());
  }, []);

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  }));

  const handleViewMore = (studentId) => {
    navigate(`/company/feedback/${studentId}`)

  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = studentDetails?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <Box height={"100vh"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "3rem",
        }}
      >
        <Grid container sx={{ disply: "flex", justifyContent: "center" }}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              variant="h4"
              sx={{ marginTop: "5rem", textAlign: "center" }}
            >
              Feedback Details
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display={"flex"}
            justifyContent={"center"}
          >
            <Paper
              sx={{
                width: "100%",
                maxWidth: "80rem",
                marginTop: "4rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: " #6082B6" }}>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>JobRole</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Interview Performance</TableCell>
                      <TableCell>Interview Status</TableCell>
                      <TableCell>Meeting</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentDetails?.length > 0 ? (
                      studentDetails?.map((student) => {
                        let statusColor = "";

                        const totalInterviewScore = parseInt(
                          student.TotalInterviewScore
                        );

                        if (totalInterviewScore >= 9) {
                          statusColor = "darkgreen";
                        } else if (totalInterviewScore >= 6) {
                          statusColor = "lightgreen";
                        } else if (totalInterviewScore >= 4) {
                          statusColor = "orange";
                        } else {
                          statusColor = "red";
                        }

                        return (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.jobRole}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.phone}</TableCell>
                            <TableCell>{student.TotalInterviewScore}</TableCell>
                            <TableCell>
                              <span style={{ color: statusColor }}>
                                {student.feedbackStatus}
                              </span>
                            </TableCell>
                            <TableCell>
                              <StyledButton
                                variant="contained"
                                onClick={() => handleViewMore(student.studentId)}
                              >
                                View Details
                              </StyledButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <Typography variant="h6">
                        There No Student Detail
                      </Typography>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Stack
        spacing={2}
        style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={Math.ceil(studentDetails?.length / rowsPerPage)}
          shape="roundedpage"
          color="primary"
          variant="outlined"
          onChange={handleChangePage}
        />
      </Stack>
    </Box>
  );
};

export default Students;
