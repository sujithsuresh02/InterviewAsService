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
import Image from "../../../Images/Hiring-2048x1449.webp";
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
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: "3.5rem",
            fontWeight: "600",
            color: "#080a3c",
            fontFamily: "Poppins, sans-serif",
            marginTop: "6rem",
            textAlign: { xs: "center", sm: "center" },
            
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
          Experience the new powerful way of technical hiring by using Interview-as-a-Service with InterviewVector. We help companies hire the right talent in the shortest time possible, by conducting technical interviews on their behalf
        </Typography>
          <Button sx={{backgroundColor:"#1b1b1b",  color :"white", marginTop:"2rem" ,height:"3rem", width:"10rem", "&:hover": {
          backgroundColor: "#080a3c", // Set the background color on hover
          color: "white", // Set the text color on hover
        }, 
    }}>Book a Demo</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <StyledImage
            src={Image}
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
