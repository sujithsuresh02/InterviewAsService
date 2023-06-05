import React from "react";
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Start } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Link} from "react-router-dom"
export default function ThirdSectionLandingPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  return (
    <React.Fragment >
      <Grid container marginTop={"2rem"}>
        <Grid
          item
          sm={12}
          xs={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        
              <Box sx={{ display: 'flex', flexDirection: 'column' ,justifyContent:"center" ,fontSize: "23px",
    lineHeight: "61px",
    marginTop: "35px"}}>
        <Typography
            variant="h1"
            sx={{
              fontSize: "40px",
              fontWeight: "600",
              color: "#080a3c",
              marginTop: "50px",
              textAlign:"Start"
            }}
          
          >
            On-demand
technical <br/>interviews
          </Typography>
                <Typography variant="p" sx={{ color: "#4a6f8a" ,textAlign:"start"} }>
                  Schedule Interviews within minutes
                </Typography>
                <Typography variant="p" sx={{ color: "#4a6f8a",textAlign:"start" }}>
                  Get detailed feedback within 4hrs
                </Typography>
                <Typography variant="p" sx={{ color: "#4a6f8a" ,textAlign:"start"}}>
                  Can easily conduct accelerated hiring drives or campus hiring
                </Typography>
                <Typography variant="p" sx={{ color: "#4a6f8a",textAlign:"start" }}>
                  Completely customised interview process
                </Typography>
                <Typography variant="p" sx={{ color: "#4a6f8a",textAlign:"start" }}>
                  Best candidate experience
                </Typography>
                <Link to={'/interview_as_service'}>
                <Button
            sx={{
              backgroundColor: "#1b1b1b",
              color: "white",
              marginTop: "2rem",
              height: "3rem",
              width: "10rem",
              "&:hover": {
                backgroundColor: "#080a3c",
                color: "#fff",
              },
            }}
          >
            Learn More <ArrowForwardIcon sx={{marginLeft:"5px"}}/>
          </Button>
          </Link>
              </Box>
           
         
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: isMediumDownScreen ? "center" : "flex-start",
          }}
        >
          <img
            src="https://interviewvector.com/images/services/whyIV3.svg"
            style={{ maxWidth: "100%", marginTop: "7rem" }}
            alt=""
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
