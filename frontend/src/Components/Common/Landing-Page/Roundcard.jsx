import React ,{useState}from 'react'
import { Box, Card, CardContent, Grid, IconButton, Typography,styled } from "@mui/material";

const RoundCard = styled(Card)(({ theme,clicked,transition }) => ({
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    width: "250px",
    cursor: "pointer",
    transition: "transform 0.2s", 
    transform: clicked ? "scale(1.1)" : "scale(1)",
    "&:hover": {
      transform: "scale(1.1)",
    },
    borderRadius:" 20px",
    boxShadow: "-4px 6px 23px -5px rgba(0, 0, 0, 0.14)",
   
  }));
  const StyledCount = styled(Typography)(({ theme }) => ({
    textAlign:"center",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#f18d17",
    marginTop: theme.spacing(1),
  }));
  const StyledDescription = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    color: "#f18d17c",
    textAlign: "center",
  }));

export default function RoundCards({transition,Icon,count,Icons,description}) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  
  return (
   <Box>
    <Grid container>
        <Grid item >

            <RoundCard clicked={isClicked} onClick={handleClick} transition={transition}>
      <CardContent>
      <Box sx={{  color: "red",display: "flex",
        justifyContent: "center",
        alignItems: "center", 
       fontSize:"2rem" }}>
      <Typography component="span" sx={{ fontSize: "2rem", color: "blue" }}>
        <Icon></Icon>
      </Typography>
    </Box>
        
        <StyledCount>{count} </StyledCount>
    <StyledDescription>{description} <IconButton>{Icons}</IconButton> </StyledDescription>
      </CardContent>
    </RoundCard>

        </Grid>
    </Grid>
   </Box>
  )
}

