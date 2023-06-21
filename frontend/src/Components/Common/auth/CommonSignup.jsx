import React, { useState,useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  FormLabel,
} from "@mui/material";
import { SignInWithGoogle } from "../../../Firebase/Firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import { postSignup } from "../../../Features/Slices/signupSlice";
import { googleSignIn } from "../../../Features/Slices/loginSlice";

const SignupForm = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state?.demo?.DemoDetails?.ValidationToken);
  console.log(state);
  console.log("signupstate");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
console.log(token);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    formik.setFieldValue("role", selectedRole); // Update the role value in formik state
    if (selectedRole === "company") {
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
    } else if (selectedRole === "student") {
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
    } else if (selectedRole === "interviewer") {
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      role: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(postSignup(values)).then((response) => {
        let result = response?.payload?.status;
        if (result === "success") {
          navigate("/login");
        }
      });
    },
  });


  const handleGoogleSignIn = async () => {
    try {
      const userDetails = await SignInWithGoogle();
      console.log('details');
      // const result = await dispatch(googleSignIn(userDetails));
  //  console.log(result);
      // Handle the authentication result here
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during sign-in
    }
  };





  useEffect(() => {
    if (state === token) {
    return 
    } else {
      navigate("/");
    }
  });
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Paper elevation={3} style={{ padding: "2rem", width: "80%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Signup
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormLabel sx={{ fontWeight: "500" }}>Select Role</FormLabel>
            <Select
              label="Role"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.role}
              onChange={handleRoleChange} // Update the onChange prop to use handleRoleChange function
              error={formik.touched.role && formik.errors.role}
              helperText={formik.touched.role && formik.errors.role}
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="Company">Company</MenuItem>
              <MenuItem value="Interviewer">Interviewer</MenuItem>
            </Select>

            <TextField
              variant="outlined"
              label="Name"
              margin="normal"
              fullWidth
              {...formik.getFieldProps("name")}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              fullWidth
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              {...formik.getFieldProps("confirmPassword")}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Grid container direction="column" spacing={1} marginTop={3}>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Signup
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="p" marginLeft={"12rem"}>
                  OR
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  onClick={handleGoogleSignIn}
                >
                  Signup with Google
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
