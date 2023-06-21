import React ,{ useEffect } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { getFullPlans } from "../../../Features/Slices/Admin/addPlans";
import { deletePlans } from "../../../Features/Slices/Admin/addPlans"; 
const Viewplans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


   
  const FullPlans = useSelector(
    (state) => state?.AdminPlanDetails?.FullPlanDetails?.fullPlans
  );
  useEffect(() => {
    console.log("entered into ");
    dispatch(getFullPlans());
  }, [getFullPlans,dispatch]); 


 
  console.log(FullPlans);
  console.log("full state");

  const handleEdit = (planId) => {
    navigate(`/admin/edit_plans/${planId}`);
  };

  const handleDelete = (planId) => {
    console.log("Delete plan:", planId);
    dispatch(deletePlans(planId));
  };

  return (
    <Box>
      <Typography
        variant="h6"
        textAlign={"center"}
        component="div"
        sx={{ mb: 2 }}
      >
        View All Plans
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Plan Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Validity</TableCell>
              <TableCell>Number Of Interviews</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FullPlans &&
              FullPlans?.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.id}</TableCell>
                  <TableCell>{plan.planName}</TableCell>
                  <TableCell>{plan.price}</TableCell>
                  <TableCell>{plan.validity}</TableCell>
                  <TableCell>{plan.interviews}</TableCell>
                  <TableCell>{plan.createddate}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(plan.id)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Viewplans;
