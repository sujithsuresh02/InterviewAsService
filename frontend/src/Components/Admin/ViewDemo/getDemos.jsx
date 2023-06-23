import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Box ,Button,Stack,Pagination} from '@mui/material';
import { getFullDemos } from '../../../Features/Slices/Admin/getDemoRequest';
import { emailConfirmation } from '../../../Features/Slices/Admin/SendConfirmmailSlice';
import {toast} from "react-hot-toast"
// import Pagination from '@mui/material/Pagination';

const UserTable = () => {
  const token = useSelector((state) => state.adminToken);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getFullDemos());
  }, [dispatch]);
  
  const Data = useSelector((state) => state?.getDemo?.getDemoData?.result);
  
  const paginatedData = Data?.slice((page - 1) * rowsPerPage,
  (page - 1) * rowsPerPage + rowsPerPage);

const handleClick = (email) => {
  console.log(email);
  console.log('id');
  dispatch(emailConfirmation(email)).then((response) => {
    console.log(response);
    toast.success(response?.payload?.message)
    
  });
};
  





  return (
    <Box >
      <Typography variant="h6" textAlign={"center"} component="div" sx={{ mb: 2 }}>
         View Demo Request
      </Typography>
      <TableContainer component={Paper} sx={{overflowX:"auto"}}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
<TableCell>ID</TableCell>
    <TableCell>Full Name</TableCell>
    <TableCell>Company</TableCell>
    <TableCell>Role</TableCell>
    <TableCell>Email</TableCell>
    <TableCell>Contact Number</TableCell>
    <TableCell>Learn About Us</TableCell>
    <TableCell>Created At</TableCell>
    <TableCell>Mail</TableCell>
  </TableRow>
          </TableHead>
          <TableBody>
          {paginatedData ?paginatedData?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.emailId}</TableCell>
                <TableCell>{row.contactNumber}</TableCell>
                <TableCell>{row.learnAboutUs}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleClick(row.emailId)}>
                    Send Confirmation mail
                  </Button>
                </TableCell>
              </TableRow>
            )):
            <Typography variant='h6'> There Is No Demo Request's</Typography>}

          </TableBody>
        </Table>
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

export default UserTable;


