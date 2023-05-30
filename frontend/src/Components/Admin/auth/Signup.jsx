import React from 'react';
import { Container, TextField, Button, Avatar, Typography, styled } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { adminSignup } from '../../../Features/Slices/Admin/authSignup';
const ContainerStyled = styled(Container)`
  width: 70%;
  height: 80vh;
  background-color: #f5f5f5;
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AvatarStyled = styled(Avatar)`
  margin: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const FormStyled = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

const SubmitButtonStyled = styled(Button)`
  margin: ${({ theme }) => theme.spacing(3, 0, 2)};
`;

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  name: Yup.string().required('AdminName is required'),
});

const SignupPage = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const registerResponse=useSelector(state=>state.adminSignup.adminSignupDetails.status)
  console.log(registerResponse);
  console.log("state");
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Add your form submission logic here
      console.log(values);
      dispatch(adminSignup(values))
      if(registerResponse==="Success"){
        navigate('/admin/login')
      }
    },
  });

  return (
    <ContainerStyled maxWidth="xs" sx={{ marginTop: "5rem" }}>
      <AvatarStyled>
        <LockOutlined />
      </AvatarStyled>
      <Typography component="h1" variant="h5">
        Admin Sign Up
      </Typography>
      <FormStyled onSubmit={formik.handleSubmit}>



      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="name"
          label="name"
          type="tel"
          id="name"
          autoComplete="tel"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
       
        <SubmitButtonStyled type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </SubmitButtonStyled>
      </FormStyled>
    </ContainerStyled>
  );
};


export default SignupPage;
