import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Stack,
  Pagination,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  assignInterviewer,
  checkInterviewStatus,
  getStudentDetails,
} from "../../../Features/Slices/Admin/listStudentDetails";
const Student = () => {
  const { companyId,requestId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStudentDetails(requestId));
  }, [getStudentDetails, dispatch]);

  useEffect(() => {
    dispatch(checkInterviewStatus(companyId));
  }, [dispatch, checkInterviewStatus]);

  const interviewData = useSelector(
    (state) => state?.studentDetails?.checkInterviewStatus?.response
  );

  console.log(interviewData, "interviewData");
  const Data = useSelector((state) => {
    return state?.studentDetails?.studentDetails?.response;
  });
  console.log(Data, "da");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAssignInterviewer = (id) => {
    console.log(id);
    const result = dispatch(assignInterviewer(id));
    if (result) {
      navigate("/admin/addtime_slot");
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          width: "100%",
          margin: "0 auto",
          border: "3px solid #ccc",
          marginTop: "4rem",
          overflowX: "auto",
        }}
      >
        <div
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "2rem" }}
        >
          Student Details
        </div>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#f9f9f9" }}>
              <TableCell style={{ border: "1px solid #ccc" }}>Id</TableCell>
              <TableCell style={{ border: "1px solid #ccc" }}>Name</TableCell>
              <TableCell style={{ border: "1px solid #ccc" }}>
                phone Number
              </TableCell>
              <TableCell style={{ border: "1px solid #ccc" }}>Email</TableCell>
              <TableCell style={{ border: "1px solid #ccc" }}>
                Experience
              </TableCell>
              <TableCell style={{ border: "1px solid #ccc" }}>
                Interviewer
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data &&
              Data.slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    {row.id}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    {row.phone}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    {row.email}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    {row.experience}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #ccc" }}>
                    {interviewData?.find((interview) => interview.studentId === row.id)? (
                      interviewData?.map((interview) => {
                        if (
                          interview.studentId &&
                          interview?.studentId === row.id
                        ) {
                          if (interview.interviewStatus === "scheduled") {
                            return (
                              <Link to={"/admin/interviews"}>
                                <Button variant="outlined" color="inherit">
                                  View Interviewer
                                </Button>
                              </Link>
                            );
                          } else if (
                            interview.interviewStatus === "completed"
                          ) {
                            return (
                              <Button variant="outlined" color="success">
                                Interview Completed
                              </Button>
                            );
                          } else if (
                            interview.interviewStatus === "cancelled"
                          ) {
                            return (
                              <Link to={"/admin/cancelled_interviews"}>
                                <Button variant="outlined" color="error">
                                  Interview Cancelled
                                </Button>
                              </Link>
                            );
                          }
                        } return 
                      })
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleAssignInterviewer(row.id)}
                      >
                        Assign Interviewer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        spacing={2}
        style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={Math.ceil(Data?.length / rowsPerPage)}
          shape="roundedpage"
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
};

export default Student;
