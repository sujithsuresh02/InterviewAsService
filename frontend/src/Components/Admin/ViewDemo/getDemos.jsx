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
import { Box ,Button} from '@mui/material';
import { getFullDemos } from '../../../Features/Slices/Admin/getDemoRequest';
import { emailConfirmation } from '../../../Features/Slices/Admin/SendConfirmmailSlice';

// import Pagination from '@mui/material/Pagination';

const UserTable = () => {
  const token = useSelector((state) => state.adminToken);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const Data = useSelector((state) => state?.getDemo?.getDemoData?.result);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFullDemos());
  }, [dispatch]);

  

const handleClick = (email) => {
  console.log(email);
  console.log('id');
  dispatch(emailConfirmation(email)).then((response) => {
    console.log(response.payload.message);
  });
};
  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
          {Data && Data.map((row) => (
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
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      {/* <Pagination
        count={Math.ceil(users.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2 }}
      /> */}
    </Box>
  );
};

export default UserTable;


