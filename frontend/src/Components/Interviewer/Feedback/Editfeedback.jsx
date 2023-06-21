import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Button, TextField, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateFeedback } from "../../../Features/Slices/Interviewer/Interviewer";
import { toast } from "react-hot-toast";
const EditFeedbackDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [matchingInterviews, setMatchingInterviews] = useState({});

  const { interviewId } = useParams();

  const completedInterviews = useSelector(
    (state) => state?.interviwer?.completedInterveiws?.result
  );
  console.log(interviewId);

  useEffect(() => {
    if (completedInterviews) {
      const matchedInterviews = completedInterviews.filter(
        (interview) => interview.interview_id === interviewId
      );
      setMatchingInterviews(matchedInterviews[0]);
    }
  }, [completedInterviews, interviewId]);

  console.log(matchingInterviews, "matched");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      codingScore: matchingInterviews?.CodingScore,
      technicalScore: matchingInterviews?.TechnicalScore || "",
      communicationScore: matchingInterviews?.CommunicationScore || "",
      feedbackDescription: matchingInterviews?.FeedbackDescription || "",
      TotalInterviewScore: matchingInterviews?.TotalInterviewScore || "",
    },
    validationSchema: Yup.object({
      codingScore: Yup.string().required("Coding Score is required"),
      technicalScore: Yup.string().required("Technical Score is required"),
      communicationScore: Yup.string().required(
        "Communication Score is required"
      ),
      feedbackDescription: Yup.string().required(
        "Detailed Feedback Description is required"
      ),
    }),
    onSubmit: (values) => {
      const data = {
        interviewId: matchingInterviews.interview_id,
        codingScore: values.codingScore,
        technicalScore: values.technicalScore,
        communicationScore: values.communicationScore,
        feedbackDescription: values.feedbackDescription,
        TotalInterviewScore: values.TotalInterviewScore,
      };
      console.log(data);
      dispatch(updateFeedback(data)).then((resposne) => {
        const msg = resposne?.payload?.data?.message;
        navigate("/interviewer/completed_interviews");
        toast.success(msg);
      });
      formik.resetForm();
    },
  });

  return (
    <Box sx={{ p: 3, textAlign: "center", marginTop: "5rem" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Student Details
      </Typography>

      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, width: "100%", margin: "0 auto" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "start",
              }}
            >
              Personal Information
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", textAlign: "start" }}
            >
              <strong>Name:</strong> {matchingInterviews?.student_name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", textAlign: "start" }}
            >
              <strong>Email:</strong> {matchingInterviews?.studentEmail}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", textAlign: "start" }}
            >
              <strong>Phone:</strong> {matchingInterviews?.studentPhoneNumber}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", textAlign: "start" }}
            >
              <strong>Experience:</strong> {matchingInterviews?.experience}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "start",
              }}
            >
              Additional Information
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", textAlign: "start" }}
            >
              <strong>Skills:</strong> {matchingInterviews?.skills}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", textAlign: "start" }}
            >
              <strong>Education:</strong>{" "}
              {matchingInterviews?.studentQualification}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", textAlign: "start" }}
            >
              <strong>Address:</strong> {matchingInterviews?.address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Interview Feedback
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Coding Score"
            placeholder="Enter coding score out of 10"
            fullWidth
            name="codingScore"
            value={formik.values.codingScore}
            onChange={formik.handleChange}
            error={formik.touched.codingScore && formik.errors.codingScore}
            helperText={formik.touched.codingScore && formik.errors.codingScore}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Technical Score"
            placeholder="Enter Technical score out of 10"
            fullWidth
            name="technicalScore"
            value={formik.values.technicalScore}
            onChange={formik.handleChange}
            error={
              formik.touched.technicalScore && formik.errors.technicalScore
            }
            helperText={
              formik.touched.technicalScore && formik.errors.technicalScore
            }
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Communication Score"
            fullWidth
            name="communicationScore"
            placeholder="Enter communicationScore out of 10"
            value={formik.values.communicationScore}
            onChange={formik.handleChange}
            error={
              formik.touched.communicationScore &&
              formik.errors.communicationScore
            }
            helperText={
              formik.touched.communicationScore &&
              formik.errors.communicationScore
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Total Interview Score"
            fullWidth
            name="TotalInterviewScore"
            value={formik.values.TotalInterviewScore}
            onChange={formik.handleChange}
            error={
              formik.touched.TotalInterviewScore &&
              formik.errors.TotalInterviewScore
            }
            helperText={
              formik.touched.TotalInterviewScore &&
              formik.errors.TotalInterviewScore
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Detailed Feedback Description"
            multiline
            fullWidth
            name="feedbackDescription"
            value={formik.values?.feedbackDescription}
            onChange={formik.handleChange}
            error={
              formik.touched.feedbackDescription &&
              formik.errors.feedbackDescription
            }
            rows={4}
            helperText={
              formik.touched.feedbackDescription &&
              formik.errors.feedbackDescription
            }
          />
        </Grid>
      </Grid>

      <Button variant="contained" sx={{ mt: 3 }} onClick={formik.handleSubmit}>
        Update
      </Button>
    </Box>
  );
};

export default EditFeedbackDetailsPage;
