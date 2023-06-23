
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper ,TableContainer, Typography, Box,Stack,Pagination} from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fullSubscriptionHistory } from "../../../Features/Slices/Admin/Dashboard";
const SubscriptionTable = () => {
    const {companyId}=useParams()
 const dispathch=useDispatch()
    useEffect(() => {
        dispathch(fullSubscriptionHistory(companyId))
    }, [])
    

  const Count = useSelector((state) => state?.dashboard);
  const subscriptions=useSelector((state)=>state?.dashboard?.fullSubscriptionHistory?.response)

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 

  const paginatedData = subscriptions?.slice( (page - 1) * rowsPerPage,
  (page - 1) * rowsPerPage + rowsPerPage);
  return (
    <Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subscription ID</TableCell>
            <TableCell>Plan Name</TableCell>
            <TableCell>Validity</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData? paginatedData?.map((subscription) => (
            <TableRow key={subscription.subscriptionId}>
              <TableCell>{subscription.subscriptionId}</TableCell>
              <TableCell>{subscription.planName}</TableCell>
              <TableCell>{subscription.validity}</TableCell>
              <TableCell>{subscription.startDate}</TableCell>
              <TableCell>{subscription.endDate}</TableCell>
              <TableCell>{subscription.totalAmount}</TableCell>
            </TableRow>
          )):
          <Typography variant="h6">There is no payment history</Typography>}
        </TableBody>
      </Table>
    </TableContainer>
     <Stack
     spacing={2}
     style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
   >
     <Pagination
       count={Math.ceil(subscriptions?.length / rowsPerPage)}
       shape="roundedpage"
       color="primary"
       variant="outlined"
       onChange={handleChangePage}
     />
   </Stack>
 </Box>
    
  );
};

export default SubscriptionTable;
