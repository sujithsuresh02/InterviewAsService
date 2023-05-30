import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Student = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
    // Add more data rows as needed
  ];

  return (
    <TableContainer component={Paper} style={{ width: '65%', margin: '0 auto', border: '3px solid #ccc',marginTop:"4rem" }}>
      <div style={{ textAlign: 'center', marginTop: '1rem' ,fontSize:'2rem'}}>Student Details</div>
      <Table>
        <TableHead>
          <TableRow style={{ background: '#f9f9f9' }}>
            <TableCell style={{ border: '1px solid #ccc' }}>Name</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>Age</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>Email</TableCell>
            <TableCell style={{ border: '1px solid #ccc' }}>Interviewer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.name}</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.age}</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{row.email}</TableCell>
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
