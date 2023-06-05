import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ValidateSignupLink = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is valid or exists in your database
    if (/* Logic to validate the token */j) {
      navigate('/signup'); // Redirect to the signup page
    } else {
      navigate('/'); // Redirect to the home page
    }
  }, [navigate, token]);

  return null; // or you can render a loading spinner or message while validating the token
};

export default ValidateSignupLink;
