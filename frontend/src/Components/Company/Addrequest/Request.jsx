import React, { useRef } from "react";
import { Grid, Paper, Button, Typography, TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRequest } from "../../../Features/Slices/companySlice/companySlice";
import { cvUpload } from "../../../Features/Slices/companySlice/CvUploadSlice";
import { red } from "@mui/material/colors";
import toast, { Toaster } from 'react-hot-toast';
const validationSchema = Yup.object({
  jobRole: Yup.string().required("Job Role is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  numberOfVacancy: Yup.number().required("Number of Vacancy is required"),
  TotalStudentsCount: Yup.number().required(" TotalStudentCount is reqyured"),
});

const Request = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cvRef = useRef(null);
  const addrequestId = useSelector(
    (state) => state.addrequest?.response?.result?.addRequestId
  );
  
   const CvCountLimitMsg=useSelector((state)=>state.cvUploadDetails.CvCount.TotalUploadedCv)
   console.log(CvCountLimitMsg,"cv");
  const formik = useFormik({
    initialValues: {
      jobRole: "",
      jobDescription: "",
      optional: "",
      numberOfVacancy: "",
      TotalCountOfStudents: "",
      cv: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
    
        dispatch(addRequest(values));
        console.log("Job details submitted successfully");
      } catch (error) {
        console.error("Job details submission failed", error);
      }
    },
  });

  const handleCVUpload = async () => {
    const formData = new FormData();
    console.log(cvRef.current.files[0]);
    formData.append("cv", cvRef.current.files[0]);
    formData.append("addrequestId", addrequestId);
    dispatch(cvUpload(formData));
    toast.success('Cv Added Successfully')
    cvRef.current.value = '';
  };

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
                  required
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
                  label="TotalStudentsCount"
                  fullWidth
                  margin="normal"
                  sx={{ marginTop: "3rem" }}
                  variant="outlined"
                  name="TotalStudentsCount"
                  value={formik.values.TotalStudentsCount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.TotalCountOfStudents &&
                    Boolean(formik.errors.TotalStudentsCount)
                  }
                  helperText={
                    formik.touched.TotalStudentsCount &&
                    formik.errors.TotalStudentsCount
                  }
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" marginTop="2rem">
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "1rem" }}
                onClick={formik.submitForm}
              >
                Submit Job Details
              </Button>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" marginTop={4}>Student Details</Typography>
                <TextField
                  fullWidth
                  type="file"
                  margin="normal"
                  variant="outlined"
                  sx={{ marginTop: "1rem" }}
                  // label="Add CV"
                  name="cv"
                  // disabled={CvCountLimitMsg?.TotalStudentsCount === Number(CvCountLimitMsg?.uploadedCVsCount)}
                  inputRef={cvRef}
                  onChange={(event) => {
                    formik.setFieldValue("cv", event.currentTarget.files[0]);
                  }}
                  error={formik.touched.cv && Boolean(formik.errors.cv)}
                  helperText={formik.touched.cv && formik.errors.cv}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCVUpload}
                >
                  Upload CV
                </Button>
              </Grid>
               <Grid item xs={12} sm={6}>
                 { CvCountLimitMsg?.TotalStudentsCount=== Number(CvCountLimitMsg?.uploadedCVsCount)&&
                 <Typography variant="h6" bgcolor={"#ffcccb"}sx={{height:"3rem",fontSize:"17px" ,display:"flex",justifyContent:"center" ,alignItems:"center"}} marginTop={8}>Your Limit Is Exceed For Uploading The CV'S</Typography>
                 }
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Request;
