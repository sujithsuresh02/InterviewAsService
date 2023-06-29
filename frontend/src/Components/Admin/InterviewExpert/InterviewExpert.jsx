import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Stack,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  sentInterviewerEmailConfirmation,
  sentInterviewerRejectionmail,
} from "../../../Features/Slices/InterviewExpertslice/becominginterviewexpert";
import { getAllExpertsRequest } from "../../../Features/Slices/InterviewExpertslice/becominginterviewexpert";
const InterviewerTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExpertsRequest());
  }, [getAllExpertsRequest,dispatch]);

  const Data = useSelector((state) => state?.becomeInterviewExpert?.getAllRequest);
  console.log(Data, "experts");

  const handleClick = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (email) => {
    console.log(email);
    dispatch(sentInterviewerEmailConfirmation(email))
      .then((result) => {
        console.log(result);
        const message = result?.payload?.data?.message;
        console.log(message);
        toast.success(message);
      })
      .catch((error) => {});
    console.log("Sending confirmation email");
  };

  const handleReject = (id, email) => {
    dispatch(sentInterviewerRejectionmail({ id, email })).then((result) => {
      console.log(result);
      const message = result?.payload?.data?.message;
      toast.success(message);
    });
  };

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  

  console.log(Data,"Data");
  const paginatedData = Data?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );
  return (
    <Box>
      <Typography
        variant="h6"
        textAlign="center"
        component="div"
        sx={{ mb: 2 }}
      >
        View Interviewer Request
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Current Employer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Job Role</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.currentEmployer}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.domainExpertise}</TableCell>
                  <TableCell>{row.experience}</TableCell>
                  <TableCell>{row.Date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleClick(row)}
                    >
                      View More
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography variant="h6">
                There Is No Interviewer Request
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedInterviewer && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          sx={{ borderRadius: "10px" }}
        >
          <DialogTitle>Interviewer Details</DialogTitle>
          <DialogContent>
            <Box display={"flex"} justifyContent={"space-around"} marginTop={5}>
              <Typography variant="body1" textAlign={"start"}>
                Full Name: {selectedInterviewer.fullName}
              </Typography>
              <Typography variant="body1" textAlign={"start"}>
                Phone Number: {selectedInterviewer.phoneNumber}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-around"} marginTop={5}>
              <Typography variant="body1" textAlign={"start"}>
                Email: {selectedInterviewer.email}
              </Typography>
              <Typography variant="body1" textAlign={"start"}>
                Current Employer: {selectedInterviewer.currentEmployer}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-around"} marginTop={5}>
              <Typography variant="body1" textAlign={"start"}>
                Job Role: {selectedInterviewer.domainExpertise}
              </Typography>
              <Typography variant="body1" textAlign={"start"}>
                Experience: {selectedInterviewer.experience}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-around"} marginTop={5}>
              <Link
                href={`https://www.linkedin.com/in/${selectedInterviewer.linkedIn}`}
                target="_blank"
                rel="noopener"
              >
                LinkedIn Profile
              </Link>
              <Button color="primary" variant="contained">
                View Cv
              </Button>
            </Box>
            {/* Add more details here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={() => handleConfirm(selectedInterviewer.email)}
              color="primary"
              variant="contained"
            >
              Send Confirmation
            </Button>
            <Button
              onClick={() =>
                handleReject(selectedInterviewer.id, selectedInterviewer.email)
              }
              color="secondary"
              variant="contained"
            >
              Send Rejection
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Stack
        spacing={2}
        style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={Math.ceil(Data?.length / rowsPerPage)}
          shape="roundedpage"
          color="primary"
          variant="outlined"
          onChange={handleChangePage}
        />
      </Stack>
    </Box>
  );
};

export default InterviewerTable;
