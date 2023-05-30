import { useState } from "react";
import {
  Button,
  Modal,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle, Login } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { postSignup } from "../../../Features/Slices/signupSlice";
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  outline: "none",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  maxWidth: "600px",
  height: "650px",
  backgroundColor: "#EDEADE",
  padding: theme.spacing(2),
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
  maxWidth: "400px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledIcon = styled(AccountCircle)(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(1),
}));

const GoogleIcons = styled(GoogleIcon)(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(1),
}));
const GoogleButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
}));

function SignupForm({ open, handleClose, handleLogin }) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [roleLabels, setRoleLabels] = useState({
    company: {
      name: "Company Name",
      email: "Company Email",
    },
    student: {
      name: "Student Name",
      email: "Student Email",
    },
    interviewer: {
      name: "Interviewer Name",
      email: "Interviewer Email",
    },
  });

  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      role: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // handleClose();
      // handleLogin();
       console.log('hlo ', values)
      dispatch(postSignup(values))
    },
  });

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    formik.handleChange(event);
    formik.setFieldValue("name", "");
    formik.setFieldValue("email", "");

    if (selectedRole === "Company") {
      setRoleLabels({
        ...roleLabels,
        company: {
          name: "Company Name",
          email: "Company Email",
        },
      });
    } else if (selectedRole === "Student") {
      setRoleLabels({
        ...roleLabels,
        student: {
          name: "Student Name",
          email: "Student Email",
        },
      });
    } else if (selectedRole === "Interviewer") {
      setRoleLabels({
        ...roleLabels,
        interviewer: {
          name: "Interviewer Name",
          email: "Interviewer Email",
        },
      });
    }
  };

  return (
    <StyledModal open={open}>
      <StyledPaper>
        <StyledIcon />
        <Typography variant="h6" align="center" gutterBottom>
          Sign Up Form
        </Typography>
        <StyledForm onSubmit={formik.handleSubmit}>
          <FormControl variant="outlined">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={handleRoleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Company">Company</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Interviewer">Interviewer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="name"
            name="name"
            label={roleLabels[formik.values.role]?.name || "Name"}
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.companyName && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="email"
            name="email"
            label={roleLabels[formik.values.role]?.email || "Email"}
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <StyledButton
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Sign Up
          </StyledButton>
          <GoogleButton variant="contained" color="secondary">
            <GoogleIcon />
            Sign In with Google
          </GoogleButton>
        </StyledForm>
      </StyledPaper>
    </StyledModal>
  );
}

export default SignupForm;
