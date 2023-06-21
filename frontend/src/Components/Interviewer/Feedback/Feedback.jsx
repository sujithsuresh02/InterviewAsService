
import React from 'react';
import { Button, Typography, styled } from '@mui/material';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material';

const StyledTableContainer = styled(TableContainer)({
  maxWidth: '100%',
  marginTop:"9rem",
});

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: 'gray', // Header background color
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: 16,
  border: '1px solid #ddd', // Border color
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  border: '1px solid #ddd', // Border color
}));

const StyledTableCell = styled(TableCell)({
  border: '1px solid #ddd', // Border color
});


const StudentTable = ({ students }) => {
  const studentData = [
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      experience: '2 years',
      skills: 'JavaScript, HTML, CSS',
      education: 'Bachelor of Science',
      projects: 'Project A, Project B',
      address: '123 Street, City',
      sex: 'Male',
      age: '25',
      certifications: 'Certification A, Certification B',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '9876543210',
      experience: '3 years',
      skills: 'Python, SQL, Data Analysis',
      education: 'Master of Computer Science',
      projects: 'Project C, Project D',
      address: '456 Avenue, Town',
      sex: 'Female',
      age: '28',
      certifications: 'Certification C, Certification D',
    },
    // Add more student objects as needed
  ];
  
  return (
    
    <StyledTableContainer component={Paper}>
      <Typography variant='h4' textAlign={"center"}>
     FeedBack
      </Typography>
      <Table  sx={{marginTop:"2rem"}}>
        <TableHead >
          <TableRow>
            <StyledTableHeaderCell>Name</StyledTableHeaderCell>
            <StyledTableHeaderCell>Email</StyledTableHeaderCell>
            <StyledTableHeaderCell>Phone</StyledTableHeaderCell>
            <StyledTableHeaderCell>Experience</StyledTableHeaderCell>
            <StyledTableHeaderCell>Address</StyledTableHeaderCell>
            <StyledTableHeaderCell>Feedback</StyledTableHeaderCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {studentData.map((student) => (
            <StyledTableRow key={student.id}>
              <StyledTableCell>{student.name}</StyledTableCell>
              <StyledTableCell>{student.email}</StyledTableCell>
              <StyledTableCell>{student.phone}</StyledTableCell>
              <StyledTableCell>{student.address}</StyledTableCell>
              <StyledTableCell>{student.experience}</StyledTableCell>
              <StyledTableCell><Button>Add Feedback</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default StudentTable;

