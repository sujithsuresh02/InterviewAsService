import React from "react";
import { Box, Card, Grid,useTheme } from "@mui/material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Header from "../../Common/Header/Header";
 import Cards from "./Card";
import Image from "../../../Images/Hiring-2048x1449.webp";
import Footer from "../../Common/Footer/Footer";

function Homepage() {
  const theme = useTheme();
  return (
    <Box bgcolor="#F5F5F5" height="auto">
      <Grid container justifyContent="center" alignItems="center" height="100%" >
        <Grid item xs={12} sm={6} md={6} sx={{display:"flex",justifyContent:"space-between"}} >
          <Grid container spacing={5}  sx={{  marginTop: theme.breakpoints.down("xs") ? "100px" : "auto",
          display:"flex", justifyContent:{sm:"center"}
           }} >
            <Grid item xs={12} sm={6} md={6}  sx={{ display: "flex", justifyContent: "center"   }}>
              <Cards
                transition={false}
                Icon={AddCircleOutlinedIcon}
                description="Add Requests"
                path="/company/add_request"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <Cards
                transition={false}
                Icon={GroupAddOutlinedIcon}
                description="Student Details"
                path="/company/student_details"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <Cards
                transition={false}
                Icon={FeedbackOutlinedIcon}
                description="Feedback Details"
                path="/company/feeback_Details"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <Cards
                transition={false}
                Icon={CreditCardOutlinedIcon}
                description="Payment Details"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} sx={{ display: "flex", justifyContent: "start" }}>
           <img src={Image}  style={{height:'25rem'}} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Homepage;
