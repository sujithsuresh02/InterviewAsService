import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

export default   function  SuccessPage()  {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '4rem' }}>
      <CheckCircleOutlineIcon sx={{ fontSize: '6rem', color: 'green', marginBottom: '1rem' }} />
      <Typography variant="h5" component="h1" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your purchase! Your payment was successful and your order has been confirmed.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Order details:
        {/* Display order details here */}
      </Typography>
      <Button variant="contained" component={Link} to="/payment-history" sx={{ marginTop: '2rem' }}>
        View Payment History
      </Button>
    </Container>
  );
};

