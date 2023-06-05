// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Button,
//   Modal,
//   Paper,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { postLogin } from "../../../Features/Slices/loginSlice";
// import { styled } from "@mui/material/styles";
// import { Google } from "@mui/icons-material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const StyledModal = styled(Modal)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   outline: "none",
//   borderRadius: theme.shape.borderRadius,
//   width: "500px",
//   height: "400px",
//   padding: theme.spacing(2),
//   textAlign: "center",
// }));

// const StyledForm = styled("form")(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   gap: theme.spacing(2),
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(2),
// }));

// const GoogleButton = styled(Button)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "#f44336",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#d32f2f",
//   },
// }));

// const GoogleIcon = styled(Google)(({ theme }) => ({
//   marginRight: theme.spacing(1),
// }));

// const SignInIcon = styled(LockOutlinedIcon)(({ theme }) => ({
//   marginRight: theme.spacing(1),
//   fontSize: "2rem",
//   borderRadius: "50%",
//   padding: theme.spacing(1),
//   backgroundColor: theme.palette.primary.main,
//   color: "#fff",
// }));




// function Loginform({ Loginopen, Loginclose, Signupopen }) {

//   const theme = useTheme();
//   const dispatch= useDispatch( )
//  const navigate=useNavigate();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log(values);
//    dispatch(postLogin(values)).then((response)=>{
//   console.log(response?.payload?.data?.loggedInDetails?.matchedAccount?.role);
//   const role=response?.payload?.data?.loggedInDetails?.matchedAccount?.role
//     if(role==="company"){
//       navigate('/company')   
//     }else {
//       navigate('/interviewer')
//     }
//   console.log("direct response");
//    })
//     },
//   });

//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     Signupopen();
//   };

//   return (
//     <StyledModal open={Loginopen} onClose={Loginclose}>
//       <StyledPaper>
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>
//         <StyledForm onSubmit={formik.handleSubmit}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type="password"
//             name="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//           />
//           <StyledButton type="submit" variant="contained" color="primary">
//             <SignInIcon />
//             Sign In
//           </StyledButton>
//           <GoogleButton variant="contained" color="secondary">
//             <GoogleIcon />
//             Sign In with Google
//           </GoogleButton>
//           <Typography variant="body2" color="textSecondary" marginTop={2}>
//             Don't have an account?{" "}
//             <Link to={"/signup"} style={{ textDecoration: "none" }}>
//               <Button onClick={handleSignupSubmit}>Sign up</Button>
//             </Link>
//           </Typography>
//         </StyledForm>
//       </StyledPaper>
//     </StyledModal>
//   );
// }

// export default Loginform;
