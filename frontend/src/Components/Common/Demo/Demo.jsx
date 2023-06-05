import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Autocomplete,
  FormLabel,
  Typography,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postDemoPage } from "../../../Features/Slices/DemoSlice/DemoSlice";
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  company: Yup.string().required("Company is required"),
  role: Yup.string().required("Your Role is required"),
  emailId: Yup.string().email("Invalid email").required("Email is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  learnAboutUs: Yup.string().required(
    "Where did you learn about us? is required"
  ),
  message: Yup.string(),
});

export const Demo = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      fullName: "",
      company: "",
      role: "",
      emailId: "",
      contactNumber: "",
      learnAboutUs: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      dispatch(postDemoPage(values));
      toast.success("Form Submitted Successfully");
      formik.resetForm();
    },
  });

  return (
    <Grid
      container
      bgcolor="#f9faff"
      display={"flex"}
      alignItems={"center"}
      marginTop={10}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          padding: "20px",
        }}
      >
        <Grid item sm={12} xs={12} md={12} lg={12}>
          <Typography variant="h4" color={"#080a3c"} fontWeight={600}>
            Just Drop In Your Details Here And We'll Get Back To You!
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        lg={6}
        sm={12}
        xs={12}
        sx={{
          padding: "40px",
        }}
      >
        <Paper
          style={{
            padding: "55px",
            background: "#fff",
            maxWidth: "100%",
            height: "100%",
            borderRadius: "15px",
          }}
        >
          <Grid item>
            <Typography
              variant="h4"
              fontSize={isSmallScreen ? "2rem" : "2rem"}
              fontWeight={600}
              color={"#1C4CB7"}
              textAlign={"center"}
            >
              Let’s connect now!
            </Typography>
            <Typography variant="h6" textAlign={"center"}>
              Share a little bit about yourself, and we will call back ASAP
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("fullName")}
                  error={formik.touched.fullName && formik.errors.fullName}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Company"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("company")}
                  error={formik.touched.company && formik.errors.company}
                  helperText={formik.touched.company && formik.errors.company}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Your Role"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("role")}
                  error={formik.touched.role && formik.errors.role}
                  helperText={formik.touched.role && formik.errors.role}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("emailId")}
                  error={formik.touched.emailId && formik.errors.emailId}
                  helperText={formik.touched.emailId && formik.errors.emailId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Contact Number"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("contactNumber")}
                  error={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
                  helperText={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Where did you learn about us?"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps("learnAboutUs")}
                  error={
                    formik.touched.learnAboutUs && formik.errors.learnAboutUs
                  }
                  helperText={
                    formik.touched.learnAboutUs && formik.errors.learnAboutUs
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={5}
                  margin="normal"
                  sx={{ minHeight: "80px" }}
                  {...formik.getFieldProps("message")}
                  error={formik.touched.message && formik.errors.message}
                  helperText={formik.touched.message && formik.errors.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Apply
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
