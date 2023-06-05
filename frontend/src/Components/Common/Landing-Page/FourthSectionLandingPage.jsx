import React from "react";
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {Link} from "react-router-dom"
import GroupAddIcon from "@mui/icons-material/GroupAdd";
export default function FourthSectionLandingPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  return (
    <React.Fragment>
      <Grid container marginTop={"5rem"}>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "23px",
              lineHeight: "45px",
              marginTop: "35px",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "40px",
                fontWeight: "600",
                color: "#080a3c",
                marginTop: "50px",
                textAlign: "Start",
              }}
            >
              Are you a techie?
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "#4a6f8a", textAlign: "start" }}
            >
              Connect with top tech community in India
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "#4a6f8a", textAlign: "start" }}
            >
              Freelance opportunity to generate a side income
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "#4a6f8a", textAlign: "start" }}
            >
              Stay updated with industry standards on technical evaluation
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "#4a6f8a", textAlign: "start" }}
            >
              Be a part of the growth journey of InterviewVector
            </Typography>
            <Link to={"/become_interviewexpert"}>
            <Button
              sx={{
                backgroundColor: "#1b1b1b",
                color: "white",
                marginTop: "2rem",
                height: "3rem",
                width: "15rem",
                "&:hover": {
                  backgroundColor: "#080a3c",
                  color: "#fff",
                },
              }}
            >
              <GroupAddIcon sx={{gap:"5px"}}/>
              Become an Expert
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
            src="https://interviewvector.com/images/become-expert/apply-now.svg"
            style={{ maxWidth: "100%", marginTop: "2rem" }}
            alt=""
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
