import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "@mui/material/styles";
import {
  addAvabilityTimeSlot,
  getAllInterviewerAvailableTime,
} from "../../../Features/Slices/Interviewer/Interviewer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  marginTop: "17rem",
  height: "50vh",
  flexDirection: "column",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "300px",
  padding: "2rem",
  boxShadow: theme.shadows[4],
  borderRadius: "8px",
  backgroundColor: "#fff",
}));

const InterviewerAvailability = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const avilableTimeslots = useSelector(
    (state) => state?.interviwer?.getallTimeslots?.resposne
  );

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimes([]);
  };

  const handleTimeSelection = (time) => {
    const updatedTimes = [...selectedTimes];
    const index = updatedTimes.indexOf(time);

    if (index > -1) {
      updatedTimes.splice(index, 1);
    } else {
      updatedTimes.push(time);
    }

    setSelectedTimes(updatedTimes);
  };

  useEffect(() => {
    dispatch(getAllInterviewerAvailableTime());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedTimes, "inside submit");
    if (selectedTimes.length === 0) {
      return;
    }

    const formattedTimes = selectedTimes.map((time) => `${time}-${time + 1}`);

    const availabilityData = {
      date: selectedDate?.toLocaleDateString(),
      dayOfWeek: selectedDate?.toLocaleDateString("en-US", { weekday: "long" }),
      times: formattedTimes,
    };

    dispatch(addAvabilityTimeSlot(availabilityData)).then((resposne) => {
      toast.success(resposne?.payload?.data?.message);
      dispatch(getAllInterviewerAvailableTime());
    });
    setSelectedDate(null);
    setSelectedTimes([]);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];

    for (let hour = 9; hour < 18; hour++) {
      const isSelected = selectedTimes.includes(hour);
      const timeRange = `${hour}-${hour + 1}`;

      timeSlots.push(
        <Button
          key={hour}
          variant={isSelected ? "contained" : "outlined"}
          onClick={() => handleTimeSelection(hour)}
          style={{ margin: "0.5rem" }}
        >
          {timeRange}
        </Button>
      );
    }

    return timeSlots;
  };

  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <StyledBox>
            <Typography variant="h5" gutterBottom>
              Interviewer Availability
            </Typography>
            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle1" gutterBottom>
                Select Date:
              </Typography>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select a date"
                calendarClassName="datepicker-calendar"
                shouldCloseOnSelect={false}
                isClearable
                showYearDropdown
                scrollableYearDropdown
              />
              {selectedDate && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Selected Date: {selectedDate.toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Select Time Slots:
                  </Typography>
                  <Box display="flex" justifyContent="center" flexWrap="wrap">
                    {renderTimeSlots()}
                  </Box>
                  <Button variant="contained" type="submit" mt={2}>
                    Update Availability
                  </Button>
                </>
              )}
            </form>
            {selectedTimes.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Selected Times:
                </Typography>
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  {selectedTimes.map((time) => (
                    <Box
                      key={time}
                      p={1}
                      m={1}
                      borderRadius="4px"
                      bgcolor="#f5f5f5"
                    >
                      {time}-{time + 1}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </StyledBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h5" textAlign="center">
            Available Timeslots
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Day of Week</TableCell>
                  <TableCell>Times</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {avilableTimeslots &&
                  avilableTimeslots.map((Times) => (
                    <TableRow key={Times.id}>
                      <TableCell>{Times.id}</TableCell>
                      <TableCell>{Times.date}</TableCell>
                      <TableCell>{Times.dayOfWeek}</TableCell>
                      <TableCell>{Times.timeSlots}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default InterviewerAvailability;
