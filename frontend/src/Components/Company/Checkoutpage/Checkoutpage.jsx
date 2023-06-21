import React from "react";
import { Typography, Button, Box, Divider } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { onApproveOrder } from "../../../Features/Slices/Paypalslice/Paypalslice";
import { createSubscriptions } from "../../../Features/Slices/Paypalslice/Paypalslice";

const CheckoutPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
const navigate=useNavigate()
  const plansDetails = useSelector((state) => state?.plans?.plans);
  const orderid = useSelector((state) => state?.paypal?.orderId?.orderId);
  //  console.log(orderid,"order");
  let plans = {};
  const matchedPlan = plansDetails.find((plan) => plan.id === id);
  if (matchedPlan) {
    plans = { ...matchedPlan };
  }
  const packDetails = plans;
  const createOrder = async (packDetails) => {
    try {
      const response = await dispatch(createSubscriptions(packDetails));
      console.log(response);
      console.log("resposne from first dispatch");
      return response?.payload?.data?.orderId;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
    }
  };

  const onApprove = async (orderid) => {
    try {
      console.log(orderid);
      console.log("second dispatch");
      const result = await dispatch(onApproveOrder(orderid));
       if(result?.payload?.data?.status==="success"){
        navigate('/company/success')
       }
      console.log("Payment captured successfully");
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      onError(error);
    }
  };

  const onError = (err) => {
    if(err){
      navigate('/copamy/checkout')
    }
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
          <PayPalButtons
            createOrder={(data, actions) => createOrder(packDetails)}
            onApprove={(data, actions) => onApprove(data.orderID)}
            onError={(error) => onError(error)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
