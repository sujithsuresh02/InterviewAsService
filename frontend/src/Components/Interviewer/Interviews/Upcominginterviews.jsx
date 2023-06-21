import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper,styled, Typography } from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '70%',
  margin: '0 auto',
  marginTop: '10rem',
  display:"flex",
  justifyContent:'center',
  flexDirection:"column"

}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const InterviewesTable = () => {
  const interviews = [
    { id: 1, name: 'John Doe', jobRole: 'Software Engineer', time: '10:00 AM' },
    { id: 2, name: 'Jane Smith', jobRole: 'UX Designer', time: '11:30 AM' },
    { id: 3, name: 'Michael Johnson', jobRole: 'Data Analyst', time: '2:00 PM' },
  ];

  const handleStartMeeting = (id) => {
    console.log(`Start meeting for interview ID ${id}`);
  };

  return (
    <StyledTableContainer component={Paper}>
      <Typography variant='h5' textAlign={"center"}> Upcoming Interviews</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Job Role</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interviews.map((interview) => (
            <TableRow key={interview.id}>
              <TableCell>{interview.name}</TableCell>
              <TableCell>{interview.jobRole}</TableCell>
              <TableCell>{interview.time}</TableCell>
              <TableCell>
                <StyledButton variant="contained" onClick={() => handleStartMeeting(interview.id)}>
                 Join Meeting
                </StyledButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default InterviewesTable;
