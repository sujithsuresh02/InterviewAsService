import React from 'react';
import {
  Grid,
  Paper,
  TextField,
  Autocomplete,
  FormLabel,
  Typography,
  Button,
  useMediaQuery,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const domainExpertiseOptions = [
  { label: 'None' },
  { label: 'Engineering' },
  { label: 'Marketing' },
  { label: 'Finance' },
  { label: 'Sales' },
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  linkedIn: Yup.string().required('LinkedIn is required'),
  cvFile: Yup.mixed().required('CV File is required'),
  currentEmployer: Yup.string().required('Current Employer is required'),
  experience: Yup.string().required('Experience is required'),
  graduationYear: Yup.string().required('Graduation Year is required'),
  domainExpertise: Yup.string().required('Domain Expertise is required'),
  message: Yup.string().required('Message is required'),
});

export default function InterviewExpertForm() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      linkedIn: '',
      cvFile: null,
      currentEmployer: '',
      experience: '',
      graduationYear: '',
      domainExpertise: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <Grid container bgcolor="#f9faff"  marginTop={20} >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
       padding:"20px"
            
        }}
      >
        <Box  sx={{display:'flex', justifyContent:"center"}}>
        <img
          src="https://interviewvector.com/images/become-expert/apply-now.svg"
          style={{ maxWidth: '100%' }}
          alt=""
        />
        </Box>
        <Grid  item sm={12} xs={12} md={12} lg={12}>
            <Typography variant='h4' textAlign={"center"} color={"#080a3c"} fontWeight={600}> Become an Expert Interviewer with us!</Typography>
            <Typography variant='h6' textAlign={"center"}color={"#080a3c"} marginTop={3}>Earn a side income while helping in hiring the best talent.</Typography>
            <Typography variant='h6' textAlign={"center"} color={"#080a3c"}>  Become part of India's best engineering commnunity.</Typography>
        </Grid>
      </Grid>
      <Grid item md={6} lg={6} sm={12} xs={12}  sx={{
       padding:"40px"
            
        }}>
        <Paper
          style={{
            padding: '25px',
            background: '#fff',
            maxWidth: '100%',
            height: '100%',
          }}
        >
          <Grid item>
            <Typography variant="h3" fontSize={isSmallScreen ? '2rem' : '3rem'}>
              Apply to become an expert!
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('fullName')}
                  error={formik.touched.fullName && formik.errors.fullName}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Phone No"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('phoneNumber')}
                  error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="LinkedIn"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('linkedIn')}
                  error={formik.touched.linkedIn && formik.errors.linkedIn}
                  helperText={formik.touched.linkedIn && formik.errors.linkedIn}
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <FormLabel
                  component="label"
                  htmlFor="cv-file"
                  style={{ marginRight: '10px' }}
                >
                  Choose your CV
                </FormLabel>
                <TextField
                  id="cv-file"
                  type="file"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('cvFile')}
                  error={formik.touched.cvFile && formik.errors.cvFile}
                  helperText={formik.touched.cvFile && formik.errors.cvFile}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} lg={6}>
                <TextField
                  label="Current Employer"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('currentEmployer')}
                  error={formik.touched.currentEmployer && formik.errors.currentEmployer}
                  helperText={formik.touched.currentEmployer && formik.errors.currentEmployer}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  label="Experience"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('experience')}
                  error={formik.touched.experience && formik.errors.experience}
                  helperText={formik.touched.experience && formik.errors.experience}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Graduation Year"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('graduationYear')}
                  error={formik.touched.graduationYear && formik.errors.graduationYear}
                  helperText={formik.touched.graduationYear && formik.errors.graduationYear}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Autocomplete
                  options={domainExpertiseOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Domain Expertise"
                      margin="normal"
                      fullWidth
                      {...formik.getFieldProps('domainExpertise')}
                      error={formik.touched.domainExpertise && formik.errors.domainExpertise}
                      helperText={formik.touched.domainExpertise && formik.errors.domainExpertise}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12} sm={12} lg={12}>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={5}
                  margin="normal"
                  sx={{ minHeight: '80px' }}
                  {...formik.getFieldProps('message')}
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
}
