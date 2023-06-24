import React, { useState, useEffect } from "react";
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
  useMediaQuery,
} from "@mui/material";
import { getAllTimeSlots } from "../../../Features/Slices/Admin/addTimeslot";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { postAssignInterviewer } from "../../../Features/Slices/Admin/addTimeslot";
import { toast } from "react-hot-toast";
const ContainerStyled = styled(Container)`
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
  margin-top: 20px;
`;

const DatePickerWrapper = styled("div")`
  width: 100%;
  height: 48px;

  .react-datepicker__input-container input {
    width: 100%;
    height: 100%;
    padding: 12px; /* Adjust the padding as needed */
    font-size: 1rem; /* Adjust the font size as needed */
  }
`;

export default function AddTimeslot() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [interviewer, setinterviewer] = useState("");
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [interviewerTimeSlot, setinterviewerTimeSlot] = useState([]);

  const studentDetails = useSelector(
    (state) => state?.studentDetails?.addTimeSlots?.response
  );

  console.log(studentDetails, "studentDetails");
  const state = useSelector((state) => state?.assignTimeSlot?.addTimeSlotData);
  console.log(state, "times");

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date(selectedDate);
    console.log(selectedDate, "dnbdsbjdfvbjdfvbjfdvbjdf");
    const formattedDate = date.toLocaleDateString("en-US");
    console.log(formattedDate);
    const formData = {
      SelectedDate: formattedDate,
      interviewerId: interviewer?.id,
      selectedTime: selectedTime,
      studentId: studentDetails[0].id,
      TimeslotId: interviewer.TimeslotId,
      interviewerEmail: interviewer.email,
      studentEmail: studentDetails[0].email,
    };
    console.log(formData);
    dispatch(postAssignInterviewer(formData)).then((response) => {
      console.log(response, "addtimeslot");
      toast.success(response?.payload?.message);
      setSelectedDate("");
      setinterviewer("");
      setSelectedTime("");
      dispatch(getAllTimeSlots());
    });
  };
  useEffect(() => {
    dispatch(getAllTimeSlots());
  }, [dispatch, getAllTimeSlots]);

  const handleDateChange = (date) => {
    const selectedDate = date;
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const getdates = new Date(formattedDate);

    setSelectedDate(date);

    const filteredInterviewers = state?.response?.filter((interviewer) => {
      const interviewDate = new Date(interviewer.date);
      return interviewDate.getDate() === getdates.getDate();
    });

    const interviewerList = filteredInterviewers?.reduce(
      (uniqueList, interviewer) => {
        const existingInterviewer = uniqueList.find(
          (item) => item.id === interviewer.interviewer_id
        );
        if (!existingInterviewer) {
          uniqueList.push({
            id: interviewer.interviewer_id,
            name: interviewer.name,
            date: interviewer.date,
            email: interviewer.email,
            TimeslotId: interviewer.Times_id,
            // createdAt: interviewer.interviewer_created_at
          });
        }
        return uniqueList;
      },
      []
    );
    setSelectedInterviewer(interviewerList);
  };
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleInterviewerChange = (event) => {
    console.log(event.target.value, "inside function");
    const { id, name, date, email, TimeslotId } = event.target.value;

    setinterviewer({ id, name, email, TimeslotId });
    const getTimeForInterviewer = (id, availableDate) => {
      const interviewerDate = new Date(availableDate);
      const matchingInterviewers = state?.response?.filter(
        (item) =>
          Number(item.interviewerId) === Number(id) &&
          interviewerDate.getTime() === new Date(item.date).getTime()
      );
      console.log(matchingInterviewers, "matchingInterviewers");
      const matchingTimes =
        matchingInterviewers
          ?.filter((interviewer) => interviewer.status === "available")
          .map((interviewer) => interviewer.timeSlot) || [];

      console.log(matchingTimes, "matchingTimes");
      return matchingTimes;
    };
    const Times = getTimeForInterviewer(id, date);
    setinterviewerTimeSlot(Times);
  };

  const timebreakpoint = useTheme();
  const isPhoneView = useMediaQuery(timebreakpoint.breakpoints.down("sm"));
  console.log(selectedInterviewer, "slected");
  return (
    <Box>
      <Typography variant="h4" textAlign="center">
        Add Timeslot
      </Typography>
      <ContainerStyled
        maxWidth="md"
        sx={{
          width: isPhoneView ? "100%" : "83%",
          marginLeft: isPhoneView ? "0" : "auto",
        }}
      >
        <SectionStyled>
          <Typography variant="h6">Student Details</Typography>
          <StudentDetailsContainer>
            <StudentDetailsList>
              {studentDetails?.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText
                    primary={student.name}
                    secondary={`Age: ${student.age}`}
                  />
                  <ListItemText primary={student.email} />
                </ListItem>
              ))}
            </StudentDetailsList>
            <StudentDetailsList>
              {studentDetails?.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText primary={student.phone} />
                </ListItem>
              ))}
            </StudentDetailsList>
          </StudentDetailsContainer>
        </SectionStyled>
        <FormSectionStyled>
          <Typography variant="h6">Assign Time Slot</Typography>
          <FormStyled onSubmit={handleSubmit}>
            <FormControl>
              <DatePickerWrapper>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  name="date"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  popperPlacement={isPhoneView ? "bottom-start" : "top-start"}
                />
              </DatePickerWrapper>
            </FormControl>
            <FormControl>
              <InputLabel>Select Interviewer</InputLabel>
              <Select
                value={interviewer}
                onChange={handleInterviewerChange}
                fullWidth
                name="interviewer"
                renderValue={(interviewer) => interviewer.name}
              >
                {Array.isArray(selectedInterviewer) &&
                selectedInterviewer.length === 0 ? (
                  <MenuItem value="">
                    No interviewers assigned for this date
                  </MenuItem>
                ) : (
                  Array.isArray(selectedInterviewer) &&
                  selectedInterviewer?.map((interviewer) => (
                    <MenuItem
                      key={interviewer.id}
                      value={{
                        id: interviewer.id,
                        name: interviewer.name,
                        date: interviewer.date,
                        email: interviewer.email,
                        TimeslotId: interviewer.TimeslotId,
                      }}
                    >
                      {interviewer?.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Select Time</InputLabel>
              <Select
                value={selectedTime}
                onChange={handleTimeChange}
                fullWidth
                name="time"
              >
                <MenuItem value="">
                  This Interviewer Available Slot Is Completed
                </MenuItem>
                {interviewerTimeSlot?.map((timeSlot) => (
                  <MenuItem key={timeSlot} value={timeSlot}>
                    {timeSlot.replace(/['"]+/g, "")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ display: "none" }}>
              <TextField
                label="Input"
                name="studentId"
                value={studentDetails.id}
                variant="outlined"
              />
            </FormControl>
            <SubmitButtonStyled
              variant="contained"
              type="submit"
              color="primary"
            >
              Submit
            </SubmitButtonStyled>
          </FormStyled>
        </FormSectionStyled>
      </ContainerStyled>
    </Box>
  );
}
