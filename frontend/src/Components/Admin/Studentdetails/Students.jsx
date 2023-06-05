import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

 import {useSelector}from"react-redux"
  
const Student = () => {

  const Data=useSelector((state)=>{
    return state?.getStudentDetails?.studentDetails?.response
  })
  console.log(Data);
  console.log('data in student ');
 

  return (
    <TableContainer component={Paper} style={{ width: '100%', margin: '0 auto', border: '3px solid #ccc',marginTop:"4rem" ,overflowX:"auto" }}>
      <div style={{ textAlign: 'center', marginTop: '1rem' ,fontSize:'2rem'}}>Student Details</div>
      <Table>
        <TableHead>
          <TableRow style={{ background: '#f9f9f9' }}>
            <TableCell style={{ border: '1px solid #ccc' }}>Id</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>Name</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>phone Number</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>Email</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>Experience</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>Interviewer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data && Data.map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.id}</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.name}</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.phone}</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.email}</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.experience}</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>
                <Button variant="outlined"   color="primary">

                  Assign Interviewer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Student;
