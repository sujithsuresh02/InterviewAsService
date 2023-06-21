import React from 'react';
import { Typography, Grid, Box, Button, TextField, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FeedbackDetailsPage = () => {
  const formik = useFormik({
    initialValues: {
      codingScore: '',
      technicalScore: '',
      communicationScore: '',
      feedbackDescription: '',
      interviewStatus: '',
    },
    validationSchema: Yup.object({
      codingScore: Yup.string().required('Coding Score is required'),
      technicalScore: Yup.string().required('Technical Score is required'),
      communicationScore: Yup.string().required('Communication Score is required'),
      feedbackDescription: Yup.string().required('Detailed Feedback Description is required'),
      interviewStatus: Yup.string().required('Interview Status is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Dummy data for student details
  const studentDetails = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    experience: '3 years',
    skills: 'React, JavaScript, HTML, CSS',
    education: "Bachelor's Degree in Computer Science",
    projects: 'Project 1, Project 2, Project 3',
    address: '123 Street, City, State, Country',
    sex: 'Male',
    age: '25',
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' ,marginTop:"5rem" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Student Details
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%', margin: '0 auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' ,textAlign:'start' }}>
              Personal Information
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem',textAlign:'start' }}>
              <strong>Name:</strong> {studentDetails.name}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem',textAlign:'start' }}>
              <strong>Email:</strong> {studentDetails.email}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem',textAlign:'start' }}>
              <strong>Phone:</strong> {studentDetails.phone}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' ,textAlign:'start'}}>
              <strong>Experience:</strong> {studentDetails.experience}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem',textAlign:'start' }}>
              Additional Information
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem',textAlign:'start' }}>
              <strong>Skills:</strong> {studentDetails.skills}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem',textAlign:'start' }}>
              <strong>Education:</strong> {studentDetails.education}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' ,textAlign:'start'}}>
              <strong>Projects:</strong> {studentDetails.projects}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem',textAlign:'start' }}>
              <strong>Address:</strong> {studentDetails.address}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' ,textAlign:'start'}}>
              <strong>Sex:</strong> {studentDetails.sex}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem',textAlign:'start' }}>
              <strong>Age:</strong> {studentDetails.age}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Interview Feedback
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Coding Score"
            fullWidth
            name="codingScore"
            value={formik.values.codingScore}
            onChange={formik.handleChange}
            error={formik.touched.codingScore && formik.errors.codingScore}
            helperText={formik.touched.codingScore && formik.errors.codingScore}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Technical Score"
            fullWidth
            name="technicalScore"
            value={formik.values.technicalScore}
            onChange={formik.handleChange}
            error={formik.touched.technicalScore && formik.errors.technicalScore}
            helperText={formik.touched.technicalScore && formik.errors.technicalScore}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Communication Score"
            fullWidth
            name="communicationScore"
            value={formik.values.communicationScore}
            onChange={formik.handleChange}
            error={formik.touched.communicationScore && formik.errors.communicationScore}
            helperText={formik.touched.communicationScore && formik.errors.communicationScore}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Detailed Feedback Description"
            multiline
            fullWidth
            name="feedbackDescription"
            value={formik.values.feedbackDescription}
            onChange={formik.handleChange}
            error={formik.touched.feedbackDescription && formik.errors.feedbackDescription}
            helperText={formik.touched.feedbackDescription && formik.errors.feedbackDescription}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Interview Status"
            fullWidth
            name="interviewStatus"
            value={formik.values.interviewStatus}
            onChange={formik.handleChange}
            error={formik.touched.interviewStatus && formik.errors.interviewStatus}
            helperText={formik.touched.interviewStatus && formik.errors.interviewStatus}
          />
        </Grid>
      </Grid>

      <Button variant="contained" sx={{ mt: 3 }} onClick={formik.handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default FeedbackDetailsPage;
