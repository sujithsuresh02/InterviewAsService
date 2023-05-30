import React from 'react';
import { Container, TextField, Button, Avatar, Typography, styled } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { adminPostLogin } from '../../../Features/Slices/Admin/adminLogin';
const ContainerStyled = styled(Container)`
  width: 60%;
  height: 60vh;
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

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLoginPage = () => {
  const dispatch=useDispatch()
 const navigate=useNavigate();
   const Status= useSelector((state)=>state.adminLogin.status)
   console.log(Status);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Add your form submission logic here using the values object
      console.log(values);
      dispatch(adminPostLogin(values))
      if(Status==="success"){
        navigate('/admin')

      }

    },
  });

  return (
    <ContainerStyled maxWidth="xs" sx={{ marginTop: '8rem' }}>
      <AvatarStyled>
        <LockOutlined />
      </AvatarStyled>
      <Typography component="h1" variant="h5">
        Admin Sign In
      </Typography>
      <FormStyled onSubmit={formik.handleSubmit}>
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
          Sign In
        </SubmitButtonStyled>
      </FormStyled>
    </ContainerStyled>
  );
};

export default AdminLoginPage;
