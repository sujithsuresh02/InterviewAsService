import React from "react";
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {Link} from "react-router-dom"
export default function BecomInterviewExpert() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  return (
    <Box>
      <Grid container marginTop={"11.5rem"}>
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
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "40px", fontWeight: "600", color: "#080a3c",    marginTop: "50px" }}
          >
            Become an Interview Expert
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "1rem", color: "#4a6f8a" }}>
            Join our community of experts across technologies, seniority levels,
            and
            <br /> geography. We are that cool tech nerd group 😛
          </Typography>
          <Link to={"/demo"}>
          <Button
            sx={{
              backgroundColor: "#1b1b1b",
              color: "white",
              marginTop: "2rem",
              height: "3rem",
              width: "10rem",
              "&:hover": {
                backgroundColor: "#080a3c",
                color: "white",
              },
            }}
          >
            Book a Demo
          </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{   display: "flex",   justifyContent: "center",
            alignItems: isMediumDownScreen ? "center" : "flex-start",
          }}
        >
          <img
            src="https://interviewvector.com/images/become-expert/banner.svg"
            style={{ maxWidth: "100%", marginTop: "1rem" }}
            alt=""
          />
        </Grid>
      </Grid>
      <Grid container bgcolor={"#f9faff"} marginTop={"6rem"} padding={"97px"}>
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
            src="https://interviewvector.com/images/become-expert/who-are-experts.svg"
            style={{ maxWidth: "100%" }}
            alt=""
          />
        </Grid>
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
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "50px", fontWeight: "600", color: "#080a3c" }}
          >
        Who are Interview Experts?
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "1rem", color: "#4a6f8a" }}>
            Experts at InterviewVector come from a variety of fields, including
            engineering, data science, analytics and product management. Many of
            them work at world's biggest and most successful companies. With our
            team of experts from around the world, we have one goal in mind : to
            make tech hiring easier.
          </Typography>
      
        </Grid>
      </Grid>
     
    </Box>
  );
}
