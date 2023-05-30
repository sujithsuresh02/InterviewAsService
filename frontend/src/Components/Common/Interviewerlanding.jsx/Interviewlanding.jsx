import React from 'react'
import {
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  styled,
} from "@mui/material";
 const  StyledTypography =styled(Typography)(({theme})=>({
  Variant: "h1",
 marginLeft:"4rem",
 marginTop:'10rem',
 fontFamily:'Poppins,sans-serif',
  color:'#080a3c',
  
 }))
function Interviewlanding() {
  return (
    <React.Fragment>
    <Grid container>
      <Grid item  xs={12} sm={6} md={12} lg={12} >
         <StyledTypography variant="h2"  sx={{fontSize:{xs:"1.75rem"}}}>
         Expert Technical <br/> Interview as a Service
         </StyledTypography>
         <Typography variant='h6' sx={{fontFamily:'Poppins,sans-serif' ,color:'#4a6f8a',lineHeight:'29px',marginTop:"20px"}} marginLeft={"4rem"} >
         On-demand technical Interviews for smart hiring, without compromising on
          <br/>your product growth.
         </Typography>
        
         </Grid>

    </Grid>

    </React.Fragment>
  )
}

export default Interviewlanding