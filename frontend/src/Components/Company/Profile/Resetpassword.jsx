import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector,useDispatch } from 'react-redux';
import {useParams,useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import { postResetPassword } from '../../../Features/Slices/companySlice/Companyprofile';
 const ResetPassword = () => {
  const dispatch= useDispatch()
const navigate=useNavigate()
const {Token}=useParams()
console.log(Token,"useparamas");
  const validationToken =useSelector((state)=>state?.CommonSignup?.SignupToken)
  console.log(validationToken,"token");

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(postResetPassword(values)).then((response)=>{
      console.log(response);
      if(response?.payload?.message){
  toast.success(response?.payload?.message)
      }
    })
  };

  validationToken.forEach((obj) => {
    if (obj?.registerResponse?.validationToken === Token) {
      console.log("Token match found!");
      console.log(obj);
      return
    }else{
      navigate('/company/profile')
    }
  });

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters long'),
      oldPassword: Yup.string()
      .required('Old Password is required')
      .min(8, 'Password must be at least 8 characters long'),
      
 
  });


  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Reset Password
      </Typography>
      <Formik
        initialValues={{
          newPassword: '',
          oldPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="oldPassword"
              as={TextField}
              label="Enter Old  Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={errors.oldPassword && touched.oldPassword}
              helperText={errors.oldPassword && touched.oldPassword && errors.oldPassword}
            />
            <Field
              name="newPassword"
              as={TextField}
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={errors.newPassword && touched.newPassword}
              helperText={errors.newPassword && touched.newPassword && errors.newPassword}
            />
            <Button type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
