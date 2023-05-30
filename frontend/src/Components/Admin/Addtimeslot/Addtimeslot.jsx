import React from "react";
import {
  Container,
  Typography,
  styled,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";

const ContainerStyled = styled(Container)`
margin-top:'20rem'
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  
`;

const SectionStyled = styled(Paper)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
`;

const FormSectionStyled = styled(SectionStyled)`
  display: flex;
  flex-direction: column;
`;

const StudentDetailsContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const StudentDetailsList = styled(List)`
  flex-basis: 50%;
`;

const FormStyled = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const SubmitButtonStyled = styled(Button)`
  align-self: flex-end;
  margin-top:"20px"
`;

export default  function AddTimeslot  (){
  const studentDetails = [
    { id: 1, name: "John Doe", age: 20 },
    { id: 2, name: "Jane Smith", age: 22 },
    { id: 3, name: "Bob Johnson", age: 21 },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };
  const  timebreakpoint=useTheme();
  let phoneview= useMediaQuery(timebreakpoint.breakpoints.down("sm"))
  console.log(phoneview);
  return (
     
    <Box marginTop={"2rem"}>
        <Typography variant="h4" textAlign={"center"}> Add Timeslot</Typography>
    <ContainerStyled maxWidth="md" sx={{ width: phoneview ? "83%" : "100%", marginLeft:phoneview?"4rem":"auto" }}>
      <SectionStyled >
        <Typography variant="h6">Student Details</Typography>
        <StudentDetailsContainer >
          <StudentDetailsList>
            {studentDetails.map((student) => (
              <ListItem key={student.id}>
                <ListItemText
                  primary={student.name}
                  secondary={`Age: ${student.age}`}
                />
              </ListItem>
            ))}
          </StudentDetailsList>
          <StudentDetailsList>
            {studentDetails.map((student) => (
              <ListItem key={student.id}>
                <ListItemText
                  primary={student.name}
                  secondary={`Age: ${student.age}`}
                />
              </ListItem>
            ))}
          </StudentDetailsList>
        </StudentDetailsContainer>
      </SectionStyled>
      <FormSectionStyled>
        <Typography variant="h6">Interviewer Time Slot</Typography>
        <FormStyled onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel>Day</InputLabel>
            <Select value="" fullWidth>
              <MenuItem value="monday">Monday</MenuItem>
              <MenuItem value="tuesday">Tuesday</MenuItem>
              <MenuItem value="wednesday">Wednesday</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Time</InputLabel>
            <Select value="" fullWidth>
              <MenuItem value="morning">Morning</MenuItem>
              <MenuItem value="afternoon">Afternoon</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Room</InputLabel>
            <Select value="" fullWidth>
              <MenuItem value="room1">Room 1</MenuItem>
              <MenuItem value="room2">Room 2</MenuItem>
              <MenuItem value="room3">Room 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Interviewer</InputLabel>
            <Select value="" fullWidth>
            <MenuItem value="room1">Room 1</MenuItem>
              <MenuItem value="room2">Room 2</MenuItem>
              <MenuItem value="room3">Room 3</MenuItem>
            </Select>
          </FormControl>
        </FormStyled>
        <SubmitButtonStyled type="submit" variant="contained" color="primary">
            Submit
          </SubmitButtonStyled>
      </FormSectionStyled>
    </ContainerStyled>
    </Box>
  );
};
