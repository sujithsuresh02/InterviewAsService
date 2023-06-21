import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Modal,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Divider,
} from "@mui/material";
import { FullPlans } from "../../../Features/Slices/companySlice/Subscriptionplans";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const PlanCard = ({ plan }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBuy = (id) => {
    console.log(id, "id");
    navigate(`/company/checkout/${id}`);
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          mb: 2,
          borderRadius: "10px",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5">{plan.planName}</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="body1">Price: {plan.price}</Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              Validity: {plan.validity}{" "}
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              Number Of Interviews: {plan.interviews}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBuy(plan.id)}
          >
            Buy Pack
          </Button>
          <Button variant="outlined" onClick={handleOpen} sx={{ ml: 2 }}>
            Full Details
          </Button>
        </Box>
      </Paper>
      <PlanModal plan={plan} isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};

const PlanModal = ({ plan, isOpen, handleClose }) => {
  const navigate = useNavigate();
  const handleBuy = (id) => {
    navigate(`/company/checkout/${id}`);
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          Close
        </Button>

        <Box display="flex" alignItems="center" mb={2}>
          <img
            src="https://yaksha.com/wp-content/uploads/2022/09/Yaksha-Logo-PNG.png"
            alt=""
            style={{ marginRight: "16px" }}
          />
          <Typography variant="h5" fontWeight="bold">
            ₹ {plan.price} Pack
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ position: "relative", bottom: "52px", left: "196px" }}
        >
          For {plan.validity} Validity
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" fontWeight="bold" mb={2}>
          Pack Details
        </Typography>

        <Typography variant="body1">
          <strong>Price:</strong> ₹ {plan.price}
        </Typography>
        <Typography variant="body1">
          <strong>Validity:</strong> {plan.validity} days
        </Typography>
        <Typography variant="body1">
          <strong>Number Of Interviews:</strong> {plan.interviews}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" fontWeight="bold" mb={2}>
          Features
        </Typography>

        <Typography variant="body1">{plan.features}</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleBuy(plan.id)}
          sx={{ mt: 2 }}
        >
          Buy Now
        </Button>
      </Box>
    </Modal>
  );
};
export const ListingPlansPage = () => {
  const dispatch = useDispatch();

  const Plans = useSelector((state) => state?.plans?.plans);
  console.log(Plans);
  console.log("plans from company");

  useEffect(() => {
    dispatch(FullPlans());
  }, []);

  const [filterValidity, setFilterValidity] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleValidityFilterChange = (event) => {
    const value = event.target.value;
    if (filterValidity.includes(value)) {
      setFilterValidity(filterValidity.filter((v) => v !== value));
    } else {
      setFilterValidity([...filterValidity, value]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Grid container spacing={2} marginTop={"7rem"} height={"80vh"}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <Typography variant="subtitle1">Validity</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox value="30" onChange={handleValidityFilterChange} />
              }
              label="30 days"
            />
            <FormControlLabel
              control={
                <Checkbox value="60" onChange={handleValidityFilterChange} />
              }
              label="60 days"
            />
            <FormControlLabel
              control={
                <Checkbox value="90" onChange={handleValidityFilterChange} />
              }
              label="90 days"
            />
          </FormGroup>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={handleSearchChange}
            fullWidth
            mt={2}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper sx={{ p: 2, boxShadow: "none" }}>
          {Plans &&
            Plans.map((plan, index) => <PlanCard key={index} plan={plan} />)}
        </Paper>
      </Grid>
    </Grid>
  );
};
