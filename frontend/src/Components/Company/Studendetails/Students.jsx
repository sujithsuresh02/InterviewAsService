import React from "react";
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
} from "@mui/material";
import Header from "../../Common/Header/Header";
import "./Style.css";
import Footer from "../../Common/Footer/Footer";
const Students = () => {
  return (
    <Box>
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
              Student Details
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
            <Paper sx={{ width: "100%", maxWidth: "80rem", marginTop: "4rem",display:'flex',justifyContent:'center' }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: " #6082B6" }}>
                    <TableRow>
                      <TableCell>Header 1</TableCell>
                      <TableCell>Header 2</TableCell>
                      <TableCell>Header 3</TableCell>
                      <TableCell>Header 3</TableCell>
                      <TableCell>Header 3</TableCell>
                      <TableCell>Header 3</TableCell>
                      <TableCell>Header 3</TableCell>
                      <TableCell>Header 3</TableCell>
                      <TableCell>Header 3</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                      <TableCell>Cell 1</TableCell>
                    </TableRow>
                    {/* Add more table rows */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Students;
