import React, { useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getSignupData } from "../../../Features/Slices/companySlice/Companyprofile";
import { editProfile } from "../../../Features/Slices/companySlice/Companyprofile";
import { resetPasswordConfirmationMail } from "../../../Features/Slices/companySlice/Companyprofile";
const EditProfile = () => {
  const dispatch = useDispatch();
  


  useEffect(() => {
    dispatch(getSignupData());
  }, [dispatch,getSignupData]);

  const signupData = useSelector((state) => state?.profile?.getSignupData);
  console.log(signupData,"signup data");



  const handleSubmit = async (values) => {
    console.log(values);
    const response = await dispatch(editProfile(values));
    console.log(response, "editprofilepahe");
 if(response?.payload){

   toast.success(response?.payload?.message);
   dispatch(getSignupData())
 }
  };

  const handleresetpassword = ({ name, email }) => {
    console.log({ name, email });
    dispatch(resetPasswordConfirmationMail({ name, email })).then(
      (response) => {
        if (response?.payload?.message) {
          toast.success(response?.payload?.message);
        }
      }
    );
  };


  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    changeEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>
      <Formik
      enableReinitialize:true
        initialValues={{
          username: signupData[0]?.name||"",
          changeEmail: signupData[0]?.email||"",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="username"
              as={TextField}
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              error={errors.username && touched.username}
              helperText={
                errors.username && touched.username && errors.username
              }
            />

            <Field
              name="changeEmail"
              as={TextField}
              label="Change Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={errors.changeEmail && touched.changeEmail}
              helperText={
                errors.changeEmail && touched.changeEmail && errors.changeEmail
              }
            />
            <Box display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleresetpassword({
                    name: signupData[0]?.name,
                    email: signupData[0]?.email,
                  })
                }
              >
                Reset Password
              </Button>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditProfile;
