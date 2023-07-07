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
  Pagination,
  Stack,
} from "@mui/material";
import { FullPlans } from "../../../Features/Slices/companySlice/Subscriptionplans";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../Images/interviewXpertslogo.png";

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

        <Box display="flex" alignItems="spce-around" mb={2}>
          <img
            src={Logo}
            alt=""
            style={{ height: "50px", width: "100px" }}
          />
          <Typography variant="h5" fontWeight="bold" >
            ₹ {plan.price} Pack
          </Typography>
        </Box>

        <Typography
          variant="body1"
          mt={3}
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
    console.log(value, "value");
    if (filterValidity.includes(value)) {
      setFilterValidity(filterValidity.filter((v) => v !== value));
    } else {
      setFilterValidity([...filterValidity, value]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  console.log(filterValidity,"filrtervalidity");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(11);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredPlans = Plans?.filter((plan) => {
    const isValidityMatch = filterValidity.length === 0 || filterValidity.includes(plan.validity);
    const isSearchMatch = searchValue === "" || (plan.planName && plan.planName.toLowerCase().includes(searchValue.toLowerCase()));
    console.log('Validity Match:', isValidityMatch);
    console.log('Search Match:', isSearchMatch);
    return isValidityMatch  && isSearchMatch;
  });
  
  console.log('Filtered Plans:', filteredPlans);
  const paginatedData = filteredPlans?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Grid container spacing={2} marginTop={"7rem"} height={"80vh"}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <Typography variant="subtitle1">Validity</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox value="3 month" onChange={handleValidityFilterChange} />
                }
                label="3 month"
              />
              <FormControlLabel
                control={
                  <Checkbox value="6 month" onChange={handleValidityFilterChange} />
                }
                label="6 month"
              />
              <FormControlLabel
                control={
                  <Checkbox value="1 year " onChange={handleValidityFilterChange} />
                }
                label="1 year"
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
            {paginatedData.length>0?
              paginatedData.map((plan, index) => <PlanCard key={index} plan={plan} />):
              <Box  display={"flex"} justifyContent={"start"}>
              <Typography variant="h4" >No Results Found</Typography >
              </Box>}
          </Paper>
        </Grid>
      </Grid>
      <Stack
        spacing={2}
        style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(Plans?.length / rowsPerPage)}
          shape="roundedpage"
          color="primary"
          variant="outlined"
          onChange={handleChangePage}
        />
      </Stack>
    </Box>
  );
};
