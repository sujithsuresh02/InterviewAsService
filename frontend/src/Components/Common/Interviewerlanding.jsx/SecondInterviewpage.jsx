import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  Grid,
  styled,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
const StyledTypography = styled(Typography)(({ theme }) => ({
  Variant: "h1",
  marginLeft: "4rem",
  marginTop: "6rem",
  fontFamily: "Poppins,sans-serif",
  color: "#080a3c",
}));

const CenteredGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

function SecondInterviewLandingPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const fontSize = isSmallScreen
    ? "1.5rem"
    : isMediumDownScreen
    ? "2rem"
    : "3rem";
  const fontWeight = isSmallScreen ? 400 : isMediumDownScreen ? 400 : 700;
  return (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop:'2rem',
            alignItems: isMediumDownScreen ? "center" : "flex-start",
          }}
        >
          <img
            src="https://interviewvector.com/images/services/Group7533.svg"
            style={{
              maxWidth: "100%",
              marginTop: "163px",
              width: "600px",
            }}
            alt=""
          />
        </Grid>
        <Grid item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center", 
          }}
        >
          <StyledTypography variant="h1" sx={{ fontSize, fontWeight }}>
            Industry standard interview <br />
            experts
          </StyledTypography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins,sans-serif",
              color: "#4a6f8a",
              lineHeight: "29px",
              marginTop: "17px",
              fontSize: "1rem",
              marginLeft: "4rem",
            }}
          >
            Most of our interview experts are currently working in FAANG level
            companies or top Indian & international startups. Our tech community
            is highly diverse in terms of types of roles, categories and
            seniority levels. We have a very rigorous onboarding & auditing
            process for ensuring quality and hence can proudly say that we have
            the best talent in our community right now.
          </Typography>
        </Grid>
      </Grid>
      <Grid container display={"flex"} justifyContent={"center"} marginTop={"7rem"} >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h2" sx={{ color: "#080a3c", fontWeight: "600" ,textAlign:"center" }}>
            Complete Engineering Hiring In One Place
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} />
        <img
          src="https://yaksha.com/wp-content/uploads/2022/07/Artboard-19.png"
          alt=""
          style={{marginTop:"3rem",maxWidth:"100%"}}
        />
      </Grid>
    </React.Fragment>
  );
}

export default SecondInterviewLandingPage;
