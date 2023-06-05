import React from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {Link} from "react-router-dom"

const StyledImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
}));

const RootContainer = styled(Box)(({ theme }) => ({
  overflowX: "hidden",
}));
function Landingpage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <RootContainer
        p={10}
        sx={{
          marginTop: "3rem",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: "3.5rem",
                fontWeight: "600",
                color: "#080a3c",
                fontFamily: "Poppins, sans-serif",
                marginTop: "8rem",
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              Hire Fast Hire Smart
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "1.25em", sm: "1.25rem", md: "1.25rem" },
                color: "#4a6f8a",
                fontFamily: "Poppins, sans-serif",
                lineHeight: "2rem",
              }}
            >
              Experience the new powerful way of technical hiring by using
              Interview-as-a-Service with InterviewVector. We help companies
              hire the right talent in the shortest time possible, by conducting
              technical interviews on their behalf
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <StyledImage
              src="https://interviewvector.com/images/on-demand-interview.svg"
              alt=""
              sx={{
                height: isSmallScreen ? "15rem" : "100%",
                width: "100%",
              }}
            />
          </Grid>
        </Grid>
      </RootContainer>
    </>
  );
}

export default Landingpage;
