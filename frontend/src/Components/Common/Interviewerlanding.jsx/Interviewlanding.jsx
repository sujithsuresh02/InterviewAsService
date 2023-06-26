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
import Group from "../../../Images/Group7173.png"
import Group1 from "../../../Images/Group7753.svg"
const StyledTypography = styled(Typography)(({ theme }) => ({
  Variant: "h1",
  marginLeft: "2rem",
  marginTop: "6rem",
  fontFamily: "Poppins,sans-serif",
  color: "#080a3c",
}));
const StyleTypography = styled(Typography)(({ theme }) => ({
  Variant: "h1",
  marginLeft: "4rem",
  fontFamily: "Poppins,sans-serif",
  color: "#080a3c",
}));

const CenteredGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

function Interviewlanding() {
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
    <React.Fragment >
       <Grid container >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center', 
        }}
      >
        <StyledTypography variant="h1" sx={{ fontSize, fontWeight }}>
          Expert Technical <br /> Interview as a Service
        </StyledTypography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Poppins,sans-serif',
            color: '#4a6f8a',
            lineHeight: '29px',
            marginTop: '17px',
            fontSize: '1rem',
            marginLeft: '4rem',
          }}
        >
          On-demand technical Interviews for smart hiring, without compromising on
          <br />
          your product growth.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: isMediumDownScreen ? 'center' : 'flex-start',
       
        }}
      >
        <img
          src={Group}
          style={{ maxWidth: '100%', marginTop:isSmallScreen?'0':'12rem', width: '600px' }}
          alt=""
        />
      </Grid>
    </Grid>
      <Grid container>
      <CenteredGrid item xs={12} sm={12} md={6} lg={6}>
      <StyleTypography variant="h1" sx={{ fontSize, fontWeight,marginTop:isSmallScreen?"3rem":"12rem" }}>
        Schedule interview within minutes
      </StyleTypography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins,sans-serif",
          color: "#4a6f8a",
          lineHeight: "29px",
          marginTop: isSmallScreen?" 0px":"17px",
          fontSize: "1rem",
          marginLeft: "4rem",
        }}
      >
        Auto-schedule interviews as per available slots by 460+ experts and receive detailed feedback within 2hrs. We are also your best partners for Campus hiring drives or if you want to scale the team rapidly.
        your product growth.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins,sans-serif",
          color: "#4a6f8a",
          lineHeight: "29px",
          marginTop: "17px",
          fontSize: "1rem",
          marginLeft: "3rem",
        }}
      >
        Save days in your hiring cycle and make sure you never miss out on good candidates.
      </Typography>
    </CenteredGrid>
        <Grid item xs={12} sm={12} md={6} lg={6}   sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: isMediumDownScreen ? 'center' : 'flex-start',
     
      }}>
          <img
            src={Group1}
            style={{ maxWidth: "100%",marginTop:isSmallScreen?'0':'12rem', width: "600px" }}
            alt=""
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Interviewlanding;
