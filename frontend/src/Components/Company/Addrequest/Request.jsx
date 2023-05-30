import React, { useRef } from "react";
import { Grid, Paper, Button, Typography, TextField, Box } from "@mui/material";
import Header from "../../Common/Header/Header";
import { Await, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../Common/Footer/Footer";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRequest } from "../../../Features/Slices/companySlice/companySlice";

const validationSchema = Yup.object({
  jobRole: Yup.string().required("Job Role is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  numberOfVacancy: Yup.number().required("Number of Vacancy is required"),
  studentName: Yup.string().required("Student Name is required"),
  TotalStudentsCount: Yup.number().required("Total Student Count Required"),
});

const Request = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cvRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      jobRole: "",
      jobDescription: "",
      optional: "",
      numberOfVacancy: "",
      studentName: "",
      TotalStudentsCount: "",
    },
    validationSchema,
    onSubmit: async (values) => {
    
      console.log(values);
        dispatch(addRequest(values));
      

      //  if(result.status=="su*ccess"){
      //    navigate('/company')
      //  }
    },
  });
  const handleCVUpload = async () => {
    const formData = new FormData();
    formData.append("cv", cvRef.current.files[0]);
    try {
      await dispatch(addRequest(formData));
      console.log("CV uploaded successfully");
      // Perform any additional actions or navigate to another page
    } catch (error) {
      console.error("CV upload failed", error);
      // Handle the error appropriately
    }
  }
  return (
    <Box>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        marginTop="10rem"
      >
        <Paper
          elevation={5}
          sx={{ p: 4, borderRadius: "12px", width: "60rem" }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Add Request
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" textAlign={"center"}>
                  Job Details
                </Typography>
                <TextField
                  label="Job Role"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="jobRole"
                  value={formik.values.jobRole}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.jobRole && Boolean(formik.errors.jobRole)
                  }
                  helperText={formik.touched.jobRole && formik.errors.jobRole}
                />
                <TextField
                  label="Job Description"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  variant="outlined"
                  name="jobDescription"
                  value={formik.values.jobDescription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.jobDescription &&
                    Boolean(formik.errors.jobDescription)
                  }
                  helperText={
                    formik.touched.jobDescription &&
                    formik.errors.jobDescription
                  }
                />
                <TextField
                  label="Optional"
                  placeholder="Enter More Details About The Job Role"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  variant="outlined"
                  name="optional"
                  value={formik.values.optional}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.optional && Boolean(formik.errors.optional)
                  }
                  helperText={formik.touched.optional && formik.errors.optional}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number Of Vacancy"
                  fullWidth
                  margin="normal"
                  sx={{ marginTop: "3rem" }}
                  variant="outlined"
                  name="numberOfVacancy"
                  value={formik.values.numberOfVacancy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.numberOfVacancy &&
                    Boolean(formik.errors.numberOfVacancy)
                  }
                  helperText={
                    formik.touched.numberOfVacancy &&
                    formik.errors.numberOfVacancy
                  }
                />
                <TextField
                  label="Total Number Of Students"
                  fullWidth
                  margin="normal"
                  sx={{ marginTop: "3rem" }}
                  variant="outlined"
                  name="TotalStudentsCount"
                  value={formik.values.TotalStudentsCount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.TotalStudentsCount &&
                    Boolean(formik.errors.TotalStudentsCount)
                  }
                  helperText={
                    formik.touched.TotalStudentsCount &&
                    formik.errors.TotalStudentsCount
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">Student Details</Typography>
                <TextField
                  label="Student Name"
                  fullWidth
                  multiline
                  margin="normal"
                  variant="outlined"
                  name="studentName"
                  value={formik.values.studentName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.studentName &&
                    Boolean(formik.errors.studentName)
                  }
                  helperText={
                    formik.touched.studentName && formik.errors.studentName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="file"
                  margin="normal"
                  variant="outlined"
                  sx={{ marginTop: "3rem" }}
                  label="Add CV"
                  name="cv"
                  inputRef={cvRef}
                  error={formik.touched.cv && Boolean(formik.errors.cv)}
                  helperText={formik.touched.cv && formik.errors.cv}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" marginTop="2rem">
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "1rem" }}
               onClick={handleCVUpload} 
              >
                Upload CV
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "1rem" }}
                onClick={formik.submitForm}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Request;
