import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAddPlans } from "../../../Features/Slices/Admin/addPlans";
import toast, { Toaster } from "react-hot-toast";
const validationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  validity: Yup.string().required("Validity is required"),
  interviews: Yup.number()
    .typeError("Number of interviews must be a number")
    .required("Number of interviews is required"),
  features: Yup.string().required("Features are required"),
});

const AddPlanForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      planName: "",
      price: "",
      validity: "",
      interviews: "",
      features: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      dispatch(postAddPlans(values)).then((response) => {
        let result = response?.payload?.data?.status;
        if (result === "Success") {
          toast.success("Plans Added Successfully");
          navigate("/admin/view_plans");
        }
      });
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper sx={{ width: "100%", height: "auto" }}>
          <Typography variant="h6" textAlign="center" mt={5}>
            Add Plan
          </Typography>
          <Box p={2}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Plan Name"
                variant="outlined"
                size="small"
                name="planName"
                value={formik.values.planName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                sx={{ height: "80px" }}
                mb={2}
                error={
                  formik.touched.planName && formik.errors.planName
                    ? true
                    : false
                }
                helperText={formik.touched.planName && formik.errors.planName}
              />
              <TextField
                label="Price"
                variant="outlined"
                size="small"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                sx={{ height: "80px" }}
                mb={2}
                error={
                  formik.touched.price && formik.errors.price ? true : false
                }
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                label="Validity"
                variant="outlined"
                size="small"
                name="validity"
                value={formik.values.validity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                sx={{ height: "80px" }}
                mb={2}
                error={
                  formik.touched.validity && formik.errors.validity
                    ? true
                    : false
                }
                helperText={formik.touched.validity && formik.errors.validity}
              />{" "}
              <TextField
                label="Number of Interviews"
                variant="outlined"
                size="small"
                name="interviews"
                value={formik.values.interviews}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                sx={{ height: "80px" }}
                mb={2}
                error={
                  formik.touched.interviews && formik.errors.interviews
                    ? true
                    : false
                }
                helperText={
                  formik.touched.interviews && formik.errors.interviews
                }
              />
              <TextField
                label="Features"
                variant="outlined"
                size="small"
                name="features"
                value={formik.values.features}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                multiline
                rows={4}
                sx={{ height: "100px" }}
                mb={2}
                error={
                  formik.touched.features && formik.errors.features
                    ? true
                    : false
                }
                helperText={formik.touched.features && formik.errors.features}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: "20px" }}
              >
                Add Plan
              </Button>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddPlanForm;
