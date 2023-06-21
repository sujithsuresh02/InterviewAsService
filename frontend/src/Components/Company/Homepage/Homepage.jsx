import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
  styled,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { totalNumberOfCvCount } from "../../../Features/Slices/companySlice/companySlice";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Card";
import { FullPlans } from "../../../Features/Slices/companySlice/Subscriptionplans";
import { paymentHistory } from "../../../Features/Slices/companySlice/Companyprofile";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FullPlans());
  }, []);

  const Plans = useSelector((state) => state?.plans?.plans);
  console.log(Plans, "plans");
  const subscriptionHistory = useSelector(
    (state) => state?.profile?.paymentHistory
  );
  console.log(subscriptionHistory, "subscription history");
  const homePagePlans = Plans ? Plans.slice(0, 6) : [];

  const totalCvCount = useSelector(
    (state) => state?.addrequest?.totalCvUploaded
  );
  console.log(totalCvCount, "totalcvcount");
  const cvCount = totalCvCount ? totalCvCount : 0;
  useEffect(() => {
    dispatch(totalNumberOfCvCount());
  }, [totalNumberOfCvCount]);

  useEffect(() => {
    dispatch(paymentHistory());
  }, [dispatch]);

  const currentDate = new Date().getTime();
  let currentSubscription = null;
  let newSubscriptionApplied = false;

  subscriptionHistory?.forEach((subscription) => {
    const startDate = new Date(subscription.startDate).getTime();
    const endDate = new Date(subscription.endDate).getTime();
 
    if (startDate <= currentDate && endDate >= currentDate) {
      if (
        !currentSubscription ||
       (currentSubscription.endDate < currentDate || Number(currentSubscription.numberOfInterviews) - Number(cvCount) ===
        0) || endDate > currentSubscription.endDate 
        
      ) {
        currentSubscription = subscription;
        console.log(currentSubscription, "cuttent");
      }
    }
  }); 
  console.log(currentSubscription?.endDate < currentDate );
  console.log('date checking');
  let balanceInterviews = 0;
  let isExpired = false;

  if (currentSubscription) {
    const endDate = new Date(currentSubscription.endDate);

    if (endDate.getTime() >= currentDate) {
      console.log("entered down");
      if (
        Number(currentSubscription.numberOfInterviews) - Number(cvCount) >=
        0
      ) {
        balanceInterviews =
          Number(currentSubscription.numberOfInterviews) - Number(cvCount);
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

  const MainContainer = styled("div")(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  }));

  console.log(currentSubscription, "current ");
  const BalanceCard = styled(Paper)(({ theme }) => ({
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    borderRadius: "15px",
    backgroundColor: "#fff",
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginRight: "auto",
      marginLeft: "auto",
    },
    marginTop: "2rem",
  }));

  const BalanceValue = styled(Typography)(({ theme }) => ({
    fontSize: "26px",
    fontWeight: "bold",
    marginLeft: "75px",
    color: "#ff4b4b",
    marginBottom: theme.spacing(1),
  }));

  const DataBalance = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    color: "#333333",
    marginBottom: theme.spacing(2),
  }));

  const theme = useTheme();

  return (
    <Box marginTop={"8rem"} bgcolor={"#f2f2f2"}>
      <MainContainer>
        <Grid
          container
          justifyContent="flex-start"
          className="slides-container"
        >
          <Grid item xs={12} sm={12} md={6}>
            {isExpired ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={250}
                width={500}
                bgcolor="#ffcccc"
                borderRadius={4}
                marginLeft={"auto"}
                marginRight={"auto"}
              >
                <Typography variant="h5" color="error">
                  Plan Expired
                </Typography>
              </Box>
            ) : balanceInterviews === 0 && currentSubscription ? (
              <BalanceCard>
                <Alert variant="filled" severity="error">
                  YOUR PLAN'S NUMBER OF INTERVIEWS LIMIT HAS EXPIRED
                </Alert>
                <Box display="flex" justifyContent="space-around">
                  <Typography variant="body1" align="center" gutterBottom>
                    Balance Interviews
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    {balanceInterviews}
                  </Typography>
                </Box>
                <Divider />
                <Typography variant="h6" textAlign="start" marginTop={"20px"}>
                  Balance Interview's
                </Typography>
                <BalanceValue align="start">{balanceInterviews}</BalanceValue>
                <DataBalance align="start">
                  Total Number Of Interviews{" "}
                  {currentSubscription?.numberOfInterviews}
                </DataBalance>
                <Typography variant="h6" textAlign="center">
                  {currentSubscription?.planName} Pack
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={"25px"}
                >
                  <Typography variant="body1">
                    Validity Date: {currentSubscription?.validity}
                  </Typography>
                  <Typography variant="body1">
                    End Date: {currentSubscription?.endDate}
                  </Typography>
                </Box>
              </BalanceCard>
            ) : !currentSubscription ? (
              <BalanceCard sx={{ bgcolor: "#ffcccc" }}>
                <Box>
                  <Typography variant="h5" align="center" gutterBottom>
                    Currently, you don't have any subscription.
                  </Typography>
                  <Typography variant="h6" align="center">
                    Please recharge to access interviews.
                  </Typography>
                </Box>
              </BalanceCard>
            ) : (
              currentSubscription && (
                <BalanceCard>
                  <Box display="flex" justifyContent="space-around">
                    <Typography variant="body1" align="center" gutterBottom>
                      Balance Interviews
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                      {balanceInterviews}
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography variant="h6" textAlign="start" marginTop={"20px"}>
                    Balance Interview's
                  </Typography>
                  <BalanceValue align="start">{balanceInterviews}</BalanceValue>
                  <DataBalance align="start">
                    Total Number Of Interviews{" "}
                    {currentSubscription?.numberOfInterviews}
                  </DataBalance>
                  <Typography variant="h6" textAlign="center">
                    {currentSubscription?.planName} Pack
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    marginTop={"25px"}
                  >
                    <Typography variant="body1">
                      Validity Date: {currentSubscription?.validity}
                    </Typography>
                    <Typography variant="body1">
                      End Date: {currentSubscription?.endDate}
                    </Typography>
                  </Box>
                </BalanceCard>
              )
            )}
            <Grid
              container
              spacing={5}
              sx={{
                display: "flex",
                justifyContent: { sm: "center" },
                marginTop: "1rem",
              }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" textAlign={"center"} fontWeight={500}>
                  Main Features
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Cards
                  transition={false}
                  Icon={AddCircleOutlinedIcon}
                  description="Add Requests"
                  path="/company/add_request"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Cards
                  transition={false}
                  Icon={GroupAddOutlinedIcon}
                  description="Student Details"
                  path="/company/student_details"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Cards
                  transition={false}
                  Icon={FeedbackOutlinedIcon}
                  description="Feedback Details"
                  path="/company/feeback_Details"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Cards
                  transition={false}
                  Icon={CreditCardOutlinedIcon}
                  description="Payment Details"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Paper
              sx={{
                padding: "10px",
                borderRadius: "15px",
                width: "100%", // Set width to 100% for smaller screens
                [theme.breakpoints.up("md")]: {
                  width: "70%", //
                  marginRight: "auto",
                  marginLeft: "auto",
                },
                marginTop: "1rem",
                backgroundColor: "#fff", // Set background color
              }}
            >
              <Typography variant="h5" gutterBottom textAlign={"center"}>
                Latest Plans
              </Typography>
              {homePagePlans &&
                homePagePlans?.map((pack, index) => (
                  <React.Fragment key={index}>
                    <Divider sx={{ marginBottom: "10px" }} />
                    <Box p={2} display="flex" justifyContent="space-between">
                      <Typography variant="h6">
                        Plan Name: {pack.planName}
                      </Typography>
                      <Typography variant="body1">
                        Price: {pack.price}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1">
                        Validity: {pack.validity}
                      </Typography>
                      <Typography>
                        <Link
                          href="/company/plans"
                          color="primary"
                          sx={{ textDecoration: "none" }}
                        >
                          View More
                        </Link>
                      </Typography>
                      <Typography variant="body1">
                        <Typography variant="body1">
                          Number Of Interviews: {pack.interviews}
                        </Typography>
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={2}></Box>
                  </React.Fragment>
                ))}
            </Paper>
          </Grid>
        </Grid>
      </MainContainer>
    </Box>
  );
}

export default Homepage;
