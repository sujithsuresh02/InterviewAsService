import React, { useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { becomeInterviewExpert } from "../../../Features/Slices/InterviewExpertslice/becominginterviewexpert";
import Applynow from "../../../Images/apply-now.svg"

const domainExpertiseOptions = [
  { label: "Front-end Development" },
  { label: "Back-end Development" },
  { label: "Full Stack Development" },
  { label: "Mobile App Development" },
  { label: "Web Development" },
  { label: "UI/UX Design" },
  { label: "Database Management" },
  { label: "Cloud Computing" },
  { label: "DevOps" },
  { label: "Artificial Intelligence" },
  { label: "Machine Learning" },
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  linkedIn: Yup.string().required("LinkedIn is required"),
  cvFile: Yup.mixed().required("CV File is required"),
  currentEmployer: Yup.string().required("Current Employer is required"),
  experience: Yup.string().required("Experience is required"),
  graduationYear: Yup.string().required("Graduation Year is required"),
  domainExpertise: Yup.string().required("Domain Expertise is required"),
  message: Yup.string().required("Message is required"),
});

const filteredOptions = domainExpertiseOptions.filter(
  (option) => option !== undefined
);

export default function InterviewExpertForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      linkedIn: "",
      cvFile: null,
      currentEmployer: "",
      experience: "",
      graduationYear: "",
      domainExpertise: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.cvFile[0]);
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("linkedIn", values.linkedIn);
      formData.append("cvFile", values.cvFile[0]);
      formData.append("currentEmployer", values.currentEmployer);
      formData.append("experience", values.experience);
      formData.append("graduationYear", values.graduationYear);
      formData.append("domainExpertise", values.domainExpertise);
      formData.append("message", values.message);

      const response = await dispatch(becomeInterviewExpert(formData));

      if (response?.payload?.data?.message) {
        toast.success(response?.payload?.data?.message);
        formik.resetForm();
        resetFileInput();
      }
    },
  });

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the value of the file input field
    }
  };

  return (
    <Grid container bgcolor="#f9faff" marginTop={22}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          padding: "25px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={Applynow}
            style={{ maxWidth: "100%" }}
            alt=""
          />
        </Box>
        <Grid item sm={12} xs={12} md={12} lg={12}>
          <Typography
            variant="h4"
            textAlign={"center"}
            color={"#080a3c"}
            fontWeight={600}
          >
            Become an Expert Interviewer with us!
          </Typography>
          <Typography
            variant="h6"
            textAlign={"center"}
            color={"#080a3c"}
            marginTop={3}
          >
            Earn a side income while helping in hiring the best talent.
          </Typography>
          <Typography variant="h6" textAlign={"center"} color={"#080a3c"}>
            Become part of India's best engineering community.
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
          width: "100%",
        }}
      >
        <Paper
          style={{
            padding: "25px",
            background: "#fff",
            maxWidth: "auto",
            height: "100%",
          }}
        >
          <Grid item>
            <Typography variant="h3" fontSize={isSmallScreen ? "2rem" : "3rem"}>
              Apply to become an expert!
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2} sx={{ paddingTop: "45px" }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && formik.errors.fullName
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.fullName && formik.errors.fullName
                      ? formik.errors.fullName
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? formik.errors.phoneNumber
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  id="linkedIn"
                  name="linkedIn"
                  value={formik.values.linkedIn}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.linkedIn && formik.errors.linkedIn
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.linkedIn && formik.errors.linkedIn
                      ? formik.errors.linkedIn
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  type="file"
                  id="cvFile"
                  name="cvFile"
                  inputRef={fileInputRef}
                  onChange={(event) => {
                    formik.setFieldValue("cvFile", event.currentTarget.files);
                  }}
                  error={
                    formik.touched.cvFile && formik.errors.cvFile ? true : false
                  }
                  helperText={
                    formik.touched.cvFile && formik.errors.cvFile
                      ? formik.errors.cvFile
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Current Employer"
                  id="currentEmployer"
                  name="currentEmployer"
                  value={formik.values.currentEmployer}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.currentEmployer &&
                    formik.errors.currentEmployer
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.currentEmployer &&
                    formik.errors.currentEmployer
                      ? formik.errors.currentEmployer
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  id="experience"
                  name="experience"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.experience && formik.errors.experience
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.experience && formik.errors.experience
                      ? formik.errors.experience
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Graduation Year"
                  id="graduationYear"
                  name="graduationYear"
                  value={formik.values.graduationYear}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.graduationYear &&
                    formik.errors.graduationYear
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.graduationYear &&
                    formik.errors.graduationYear
                      ? formik.errors.graduationYear
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel id="domainExpertise-label">
                    Domain Expertise
                  </InputLabel>
                  <Select
                    labelId="domainExpertise-label"
                    id="domainExpertise"
                    name="domainExpertise"
                    value={formik.values.domainExpertise}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.domainExpertise &&
                      formik.errors.domainExpertise
                        ? true
                        : false
                    }
                  >
                    {filteredOptions.map((option, index) => (
                      <MenuItem key={index} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  id="message"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.message && formik.errors.message
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.message && formik.errors.message
                      ? formik.errors.message
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Apply Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
