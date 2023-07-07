import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  styled,
  Box,
} from "@material-ui/core";
import {
  changePassword,
  validateChangepasswordPage,
} from "../../../Features/Slices/loginSlice";
import { toast } from "react-toastify";

const FormContainer = styled("div")({
  marginTop: "15rem",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
});

const StyledForm = styled("form")({
  width: "100%",
  maxWidth: "400px",
  marginTop: "1rem",
});

const SubmitButton = styled(Button)({
  marginTop: "2rem",
});

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(token, "token");
  useEffect(() => {
    dispatch(validateChangepasswordPage(token));
  }, [dispatch, validateChangepasswordPage]);

  const loginDetails = useSelector(
    (state) => state?.commonLogin?.changePasswordValidation
  );
  console.log(loginDetails, "state");
  const tokenMatch = (token, Tokens) => {
    const matchFound = Tokens?.some((obj) => obj?.id === token);
    if (!matchFound) {
      navigate("/login");
    } else {
      return;
    }
  };

  useEffect(() => {
    tokenMatch(token, loginDetails);
  }, [token, loginDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    dispatch(
      changePassword({
        newPassword: newPassword,
        email: loginDetails[0].email,
        role: loginDetails[0].role,
      })
    ).then((resposne)=>{
        console.log(resposne,"respsone");
        if(resposne.payload.message){
            navigate("/login")
            toast.success(resposne.payload.message)
        }
      })
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ display: "flex", alignContent: "center" }}
    >
      <FormContainer>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Change Password
          </SubmitButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};

export default ChangePasswordForm;
