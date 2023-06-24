import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequets } from "../../../Features/Slices/Admin/getFullRequests";
import { getStudentDetails } from "../../../Features/Slices/Admin/listStudentDetails";
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
  Stack,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ResponsiveTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  console.log(theme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getRequets());
  }, [dispatch]);

  const Data = useSelector(
    (state) => state?.getAllRequets?.AllRequests?.fullRequest
  );

  const handleClick = (companyId,requestId) => {
    navigate(`/admin/student_details/${companyId}/${requestId}`);
  };

  const handlesubscription=(companyId)=>{

     navigate(`/admin/subscription_history/${companyId}`)
  }

  console.log(Data,"dataa");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);

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
          View All Companies Requests
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
                  companyId
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  companyname
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  jobRole
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  numberOfVacancy
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  TotalStudentsCount
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>
                  RequestedDate
                </TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>Subscriptions</TableCell>
                <TableCell style={{ border: "1px solid #ccc" }}>View More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData ? (
              paginatedData?.map((row) => (
                  <TableRow key={row.companyid}>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.companyid}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.companyname}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.jobRole}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.numberOfVacancy}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.TotalStudentsCount}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      {row.requesteddate}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => handlesubscription(row.companyid)}
                      >
                        View Subscriptions
                      </Button>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ccc" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClick(row.companyid,row.id)}
                      >
                        View Student Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Box display={"flex"} justifyContent={"center"}>
                  <Grid item sm={12} xs={12} md={12}>
                    <Typography variant="h5" textAlign={"center"}>
                      There Is No Request's
                    </Typography>
                  </Grid>
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

export default ResponsiveTable;
