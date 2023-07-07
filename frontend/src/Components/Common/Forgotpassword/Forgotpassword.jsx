import React, { useState } from "react";
import { Button, TextField ,styled} from "@material-ui/core";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../Features/Slices/loginSlice";
import { toast } from "react-hot-toast";
const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
  width:'25%'
});

const TextFieldWrapper = styled(TextField)({
  marginBottom: "16px",
});

const SubmitButton = styled(Button)({
  marginTop: "16px",
});

const ForgotPasswordPage = () => {
  const navigate=useNavigate()
  const  dispatch=useDispatch()
  const [email, setEmail] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(email,"email");
  const response=await dispatch(forgotPassword({email:email}))
    console.log(response,"from the ");
    if(response?.payload?.message){
      navigate('/login')
      toast.success(response?.payload?.message)
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextFieldWrapper
          label="Email"
          type="email"
          placeholder="Enter Your Registread Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <SubmitButton type="submit" variant="contained" color="primary">
          Submit
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default ForgotPasswordPage;
