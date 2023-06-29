import React, { useEffect } from "react";
import styled from "styled-components";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer, // Import the ResponsiveContainer component
} from "recharts";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  daywiseSubscriptionCount,
  monthlySubscriptionCount,
  totalClientsAndInterviewsCount,
} from "../../../Features/Slices/Admin/Dashboard";

const SquareBox = styled(Grid)`
  width: 280px;
  height: 180px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-color: #ccc;
`;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(daywiseSubscriptionCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(monthlySubscriptionCount());
  }, [dispatch]);
  monthlySubscriptionCount;

  useEffect(() => {
    dispatch(totalClientsAndInterviewsCount());
  }, [dispatch, totalClientsAndInterviewsCount]);

  const subscriptionCount = useSelector(
    (state) => state?.dashboard?.subscriptionCount?.response
  );
  const pieChartData = useSelector(
    (state) => state?.dashboard?.monthlySubscriptionCount?.response
  );
  const dashboardData = useSelector(
    (state) => state?.dashboard?.totalClientCount?.response
  );
  console.log(dashboardData);
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF19AF",
    "#19FFAF",
  ];

  const chartData = subscriptionCount?.map((item) => ({
    name: item.subscription_day,
    value: item.subscriptions_count,
  }));
  const pieChart = pieChartData?.map((item) => ({
    name: item.subscription_month,
    value: item.subscriptions_count,
  }));

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <SquareBox>
            <Typography variant="h6" align="center">
              Total Clients Count:{dashboardData?.clientCounts}
            </Typography>
          </SquareBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SquareBox>
            <Typography variant="h6" align="center">
              Total InterviewerCount:{dashboardData?.interviewersCount}
            </Typography>
          </SquareBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SquareBox>
            <Typography variant="h6" align="center">
              Total Completed Interviews:{dashboardData?.completedInterviews}
            </Typography>
          </SquareBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SquareBox>
            <Typography variant="h6" align="center">
              Cancelled Interviews:{dashboardData?.cancelledInterview}<br/><Typography variant="body1" textAlign={"end"}>To Be Rescheduled</Typography>
            </Typography>
          </SquareBox>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={"2rem"}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box my={2}>
            <Typography variant="h5" align="center">
              Daily Subscriptions Chart
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box my={2}>
            <Typography variant="h5" align="center">
              Monthly Subscriptions Chart
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChart?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

