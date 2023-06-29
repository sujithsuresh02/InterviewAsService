import React, { useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  editProfile,
  getInterviewerDetails,
} from "../../../Features/Slices/Interviewer/Interviewer";
const EditProfile = () => {
  const dispatch = useDispatch();

  let interviewerDetails = useSelector(
    (state) => state?.interviwer?.interviewerDetails?.result
  );

  const handleSubmit = async (values) => {
    console.log(values); // Handle form submission
    dispatch(editProfile(values)).then((resposne) => {
      toast.success(resposne?.payload?.data?.message);
    });
  };

  // const handleresetpassword = ({ name, email }) => {
  //   console.log({ name, email });
  //   dispatch(resetPasswordConfirmationMail({ name, email })).then(
  //     (response) => {
  //       if (response?.payload?.message) {
  //         toast.success(response?.payload?.message);
  //       }
  //     }
  //   );
  // };

  useEffect(() => {
    dispatch(getInterviewerDetails());
  }, [dispatch,getInterviewerDetails]);
  console.log(interviewerDetails,"iterview");

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
        initialValues={{
          username: interviewerDetails?.name || "",
          changeEmail: interviewerDetails?.email || "",
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
            {/* <Box display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleresetpassword({
                    name: signupData.name,
                    email: signupData.email,
                  })
                }
              >
                Reset Password
              </Button>
            </Box> */}

            <Box display="flex" justifyContent="start">
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditProfile;
