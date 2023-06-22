import React, { useEffect } from "react";
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

  const handleClick = (id) => {
    navigate(`/admin/student_details/${id}`);
  };

  return (
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
              <TableCell style={{ border: "1px solid #ccc" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data &&
              Data.map((row) => (
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
                      color="primary"
                      onClick={() => handleClick(row.id)}
                    >
                      View Student Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableContainer>
  );
};

export default ResponsiveTable;
