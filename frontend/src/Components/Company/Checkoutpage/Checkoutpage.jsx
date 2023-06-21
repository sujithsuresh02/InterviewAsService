import React from "react";
import { Typography, Button, Box, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PayPalButtons } from '@paypal/react-paypal-js';
const CheckoutPage = () => {
  const { id } = useParams();
  const plansDetails = useSelector((state) => state?.plans?.plans);

  let plans = {};
  const matchedPlan = plansDetails.find((plan) => plan.id === id);
  console.log(matchedPlan);
  if (matchedPlan) {
    plans = { ...matchedPlan };
  }

  const handleBuyNowClick = () => {
    console.log("Buy Now clicked");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        maxWidth={600}
        width="90%"
        p={4}
        border="1px solid #ddd"
        borderRadius={8}
        textAlign="center"
        bgcolor="#fff"
      >
        <img
          src="https://yaksha.com/wp-content/uploads/2022/09/Yaksha-Logo-PNG.png"
          alt="Logo"
          style={{ width: "100px", marginBottom: "16px" }}
        />

        <Typography variant="h5" mb={2}>
          {plans.planName}Pack
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Box display={"flex"} justifyContent="space-between">
          <Box textAlign="left" mb={2}>
            <Typography variant="body1">Amount Payable</Typography>
            <Typography variant="h5">₹ {plans.price}</Typography>
          </Box>

          <Typography variant="h5">
            <Typography variant="body1">Expiry</Typography>
            {plans.validity}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" textAlign={"end"} mb={2}>
          Payment Method
        </Typography>

        <Box textAlign="center" mb={2}></Box>

        <Box display="flex" justifyContent="space-between">
          <Link to={"/company/plans"}>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Continue Shopping
            </Button>
          </Link>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} onCancel={onCancel} />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
