import React from 'react';
import{Typography,styled}  from '@mui/material';

const NotFoundContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));
  
 

const Title = styled(Typography)`
  font-size: 5rem;
  color: ${({ theme }) => theme.palette.error.main};
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

const Subtitle = styled(Typography)`
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const Message = styled(Typography)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title variant="h1">404</Title>
      <Subtitle variant="h3">Page Not Found</Subtitle>
      <Message variant="body1">Oops! The page you are looking for does not exist.</Message>
    </NotFoundContainer>
  );
};

export default NotFound;
