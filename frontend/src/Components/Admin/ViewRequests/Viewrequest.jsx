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
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ResponsiveTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequets());
  }, [dispatch]);

  const Data = useSelector((state) => {
    return state.getAllRequets.AllRequest.fullRequest;
  });
  console.log(Data);
  console.log("latest state");


  const handleClick=(id)=>{
      dispatch(getStudentDetails(id));
  }

  return (
    <TableContainer>
      <Typography
        variant="h5"
        position={"relative"}
        top={"5rem"}
        textAlign={"center"}
      >
        View All Companies Requests
      </Typography>

      <TableContainer
        component={Paper}
        style={{
          width: "60%",
          margin: "0 auto",
          border: "1px solid #ccc",
          marginTop: "8rem",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ background: "#f9f9f9" }}>
              <TableCell style={{ border: "1px solid #ccc" }}>Id</TableCell>
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
                <TableRow key={row.id}>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    {row.id}
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
                    {row.TotalStudentsCount}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    <Button variant="outlined" color="primary" onClick={() => handleClick(id)}>
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
