import React, { useRef, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { totalNumberOfCvCount } from "../../../Features/Slices/companySlice/companySlice";
import { addRequest } from "../../../Features/Slices/companySlice/companySlice";
import { cvUpload } from "../../../Features/Slices/companySlice/CvUploadSlice";
import { resetUploadedCvCount } from "../../../Features/Slices/companySlice/CvUploadSlice";
const validationSchema = Yup.object({
  jobRole: Yup.string().required("Job Role is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  numberOfVacancy: Yup.number().required("Number of Vacancy is required"),
  TotalStudentsCount: Yup.number().required(" TotalStudentCount is reqyured"),
});
import { toast } from "react-hot-toast";
const Request = () => {
  const location = useLocation();
  console.log(location, "uselocation");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cvRef = useRef(null);
  const addrequestId = useSelector(
    (state) => state.addrequest?.response?.result?.addRequestId
  );
  const state = useSelector((state) => state);
  console.log(state, "state");

  const totalCvCount = useSelector(
    (state) => state?.addrequest?.totalCvUploaded
  );
  console.log(totalCvCount, "totalcvcount");

  useEffect(() => {
    console.log("started");
    dispatch(resetUploadedCvCount());
  }, [dispatch, location.pathname]);

  const subscriptionHistory = useSelector(
    (state) => state?.profile?.paymentHistory
  );
  console.log(subscriptionHistory);

  const currentDate = new Date().getTime();
  let currentSubscription = null;
  let newSubscriptionApplied = false;

  subscriptionHistory?.forEach((subscription) => {
    const startDate = new Date(subscription.startDate).getTime();
    const endDate = new Date(subscription.endDate).getTime();

    if (startDate <= currentDate && endDate >= currentDate) {
      if (
        !currentSubscription ||
        currentSubscription.endDate < currentDate ||
        Number(currentSubscription.numberOfInterviews) - Number(totalCvCount) ===
        0 ||
        endDate > currentSubscription.endDate
      ) {
        currentSubscription = subscription;
        console.log(currentSubscription, "cuttent");
      }
    }
  });

  let balanceInterviews = 0;
  let isExpired = false;

  if (currentSubscription) {
    const endDate = new Date(currentSubscription.endDate);

    if (endDate.getTime() >= currentDate) {
      console.log("entered down");
      if (
        Number(currentSubscription.numberOfInterviews) - Number(totalCvCount) >=
        0
      ) {
        balanceInterviews =
          Number(currentSubscription.numberOfInterviews) - Number(totalCvCount);
      } else {
        balanceInterviews = 0;
        newSubscriptionApplied = true;
      }
    } else {
      isExpired = true;
    }
  }

  if (newSubscriptionApplied) {
    console.log("Your new subscription has been applied.");
  } else if (isExpired) {
    const newRechargeExists = subscriptionHistory.some(
      (subscription) => new Date(subscription.endDate).getTime() >= currentDate
    );

    if (newRechargeExists) {
      console.log("Your plan has expired. Applying the new recharge...");

      const newRecharge = subscriptionHistory.find(
        (subscription) =>
          new Date(subscription.endDate).getTime() >= currentDate
      );

      if (newRecharge) {
        console.log("finally");
        currentSubscription = newRecharge;
        console.log("New recharge applied:", currentSubscription);
      }
    } else {
      console.log("Error: Your subscription has expired.");
    }
  }


  useEffect(() => {
    dispatch(totalNumberOfCvCount());
  }, [totalNumberOfCvCount]);

  const CvCountLimitMsg = useSelector(
    (state) => state?.cvUploadDetails?.CvCount?.TotalUploadedCv
  );
  console.log(CvCountLimitMsg, "cv");
  const formik = useFormik({
    initialValues: {
      jobRole: "",
      jobDescription: "",
      optional: "",
      numberOfVacancy: "",
      TotalCountOfStudents: "",
      cv: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (currentSubscription) {
        try {
          dispatch(addRequest(values));
          console.log("Job details submitted successfully");
        } catch (error) {
          console.error("Job details submission failed", error);
        }
      } else {
        toast.error(
          " Currently, you don't have any subscription.  Please recharge to submit request."
        );
      }
    },
  });

  if (currentSubscription && isExpired) {
    toast.error("Your Plan Has Expired ");
  }
  const handleCVUpload = async () => {
    if (!currentSubscription) {
      toast.error(
        " Currently, you don't have any subscription.  Please recharge to submit request."
      );
    } else {
      const formData = new FormData();
      console.log(cvRef.current.files[0]);
      formData.append("cv", cvRef.current.files[0]);
      formData.append("addrequestId", addrequestId);
      dispatch(cvUpload(formData));
      toast.success(
        `${CvCountLimitMsg?.uploadedCVsCount}Cv Added Successfully`
      );
      cvRef.current.value = "";
    }
  };

  return (
    <Box>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        marginTop="10rem"
      >
        <Paper
          elevation={5}
          sx={{ p: 4, borderRadius: "12px", width: "60rem" }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Add Request
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" textAlign={"center"}>
                  Job Details
                </Typography>
                <TextField
                  label="Job Role"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="jobRole"
                  value={formik.values.jobRole}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.jobRole && Boolean(formik.errors.jobRole)
                  }
                  helperText={formik.touched.jobRole && formik.errors.jobRole}
                />
                <TextField
                  label="Job Description"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  variant="outlined"
                  name="jobDescription"
                  value={formik.values.jobDescription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.jobDescription &&
                    Boolean(formik.errors.jobDescription)
                  }
                  helperText={
                    formik.touched.jobDescription &&
                    formik.errors.jobDescription
                  }
                />
                <TextField
                  label="Optional"
                  placeholder="Enter More Details About The Job Role"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  variant="outlined"
                  name="optional"
                  value={formik.values.optional}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.optional && Boolean(formik.errors.optional)
                  }
                  helperText={formik.touched.optional && formik.errors.optional}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number Of Vacancy"
                  fullWidth
                  margin="normal"
                  sx={{ marginTop: "3rem" }}
                  variant="outlined"
                  name="numberOfVacancy"
                  value={formik.values.numberOfVacancy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.numberOfVacancy &&
                    Boolean(formik.errors.numberOfVacancy)
                  }
                  helperText={
                    formik.touched.numberOfVacancy &&
                    formik.errors.numberOfVacancy
                  }
                />
                <TextField
                  label="TotalStudentsCount"
                  fullWidth
                  margin="normal"
                  sx={{ marginTop: "3rem" }}
                  variant="outlined"
                  name="TotalStudentsCount"
                  value={formik.values.TotalStudentsCount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.TotalCountOfStudents &&
                    Boolean(formik.errors.TotalStudentsCount)
                  }
                  helperText={
                    formik.touched.TotalStudentsCount &&
                    formik.errors.TotalStudentsCount
                  }
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" marginTop="2rem">
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "1rem" }}
                onClick={formik.submitForm}
              >
                Submit Job Details
              </Button>
              {!currentSubscription}
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" marginTop={4}>
                  Student Details
                </Typography>
                {balanceInterviews === 0 && currentSubscription && (
                  <Alert variant="filled" severity="error">
                    YOUR PLAN'S NUMBER OF INTERVIEWS LIMIT HAS EXPIRED . IF YOU
                    WANT'S TO CONTINUE PLEASE SUBSCRIBE IMMEDIATELY
                  </Alert>
                )}
                <TextField
                  fullWidth
                  type="file"
                  margin="normal"
                  variant="outlined"
                  sx={{ marginTop: "1rem" }}
                  // label="Add CV"
                  name="cv"
                  disabled={
                    (balanceInterviews == 0 && currentSubscription) ||
                    Number(CvCountLimitMsg?.uploadedCVsCount) ===
                      CvCountLimitMsg?.TotalStudentsCount ||
                    isExpired
                  }
                  inputRef={cvRef}
                  onChange={(event) => {
                    formik.setFieldValue("cv", event.currentTarget.files[0]);
                  }}
                  error={formik.touched.cv && Boolean(formik.errors.cv)}
                  helperText={formik.touched.cv && formik.errors.cv}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCVUpload}
                  disabled={balanceInterviews <= 0 && currentSubscription}
                >
                  Upload CV
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {Number(CvCountLimitMsg?.uploadedCVsCount) ===
                  CvCountLimitMsg?.TotalStudentsCount && (
                  <Typography
                    variant="h6"
                    bgcolor={"#ffcccb"}
                    sx={{
                      height: "3rem",
                      fontSize: "17px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    marginTop={8}
                  >
                    Your Limit Is Exceed For Uploading The CV'S For{" "}
                    {CvCountLimitMsg?.jobRole} Role
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Request;
