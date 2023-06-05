import React from "react";
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function BecomInterviewExpert() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  return (
    <Box>
      <Grid container marginTop={isSmallScreen?"1rem":"8rem"}>
        <Grid
          item
          sm={12}
          xs={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"center"
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "40px",
              fontWeight: "600",
              color: "#080a3c",
              marginTop: "50px",
              textAlign:'center'
            }}
          >
         Your journey to becoming an expert with Interviewvector
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: isMediumDownScreen ? "center" : "flex-start",
          }}
        >
          <img
            src="https://interviewvector.com/images/become-expert/journey.svg"
            style={{ maxWidth: "100%", marginTop: "5rem" }}
            alt=""
          />
        </Grid>
      </Grid>
    </Box>
  );
}
