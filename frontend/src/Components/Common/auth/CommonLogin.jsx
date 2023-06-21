import React, { useState } from 'react';
import { Grid, Typography, TextField, Paper, FormControlLabel, Checkbox, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleIcon from '@mui/icons-material/Google';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginSlice, { postLogin } from '../../../Features/Slices/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignInWithGoogle } from '../../../Firebase/Firebase';
import { googleSignIn } from '../../../Features/Slices/loginSlice';
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      dispatch(postLogin(values)).then((response) => {
        let role = response?.payload?.data?.loggedInDetails?.matchedAccount?.role;
        if (role === 'company') {
          toast.success('Logged in as a company'); 
          navigate('/company');
        } else if (role === 'interviewer') {
          toast.success('Logged in as an interviewer'); 
          navigate('/interviewer');
          loginSlice
        } else {
        }
      });
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const userDetails = await SignInWithGoogle();
      console.log(userDetails);
      console.log('details');
      const result = await dispatch(googleSignIn(userDetails?.user?.auth));
  //  console.log(result);
      // Handle the authentication result here
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during sign-in
    }
  };


  return (
    <Grid container>
      <ToastContainer/>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} marginTop={'8rem'}>
        {/* Image container */}
        <img
          src="https://interviewvector.com/images/services/whyIV1.svg"
          alt="Login Image"
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} display={'flex'} justifyContent={'center'}>
        {/* Form container */}
        <Paper elevation={3} style={{ padding: '5rem', marginTop: '10rem', width: '400px' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              {...formik.getFieldProps('email')}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox checked={showPassword} onChange={handleShowPassword} color="primary" />}
              label="Show Password"
            />
            <Grid container direction="column" spacing={1} marginTop={3}>
              <Grid item>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="p" marginLeft={'12rem'}>
                  OR
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" startIcon={<GoogleIcon />} fullWidth onClick={handleGoogleSignIn}> 
                  Login with Google
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

    </Grid>
  );
};

export default LoginForm;
