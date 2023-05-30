import React ,{useState}from 'react'
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Grid,Typography,styled ,Icon} from "@mui/material";

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

  const StyledDescription = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    color: "#f18d17c",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: theme.spacing(1),
  }));

  const StyledIcon = styled(Icon)(({theme})=>({
    fontSize: "25px", /* Adjust the size as desired */
    color:"black",
  }))
  
export default function Cards({transition,Icon,description,path}) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  
  return (
   <Box >
    <Grid container >
        <Grid item >

            <RoundCard clicked={isClicked} onClick={handleClick} transition={transition}>
      <CardContent>
      <Box sx={{ display: "flex",
        justifyContent: "center",
        alignItems: "center", 
    }}>
      
        <StyledIcon><Icon/></StyledIcon>
     
    </Box>
   < Link to={path} style={{textDecoration: 'none', color:"black"} }>
    <StyledDescription>{description}  </StyledDescription>
    </Link>
      </CardContent>
    </RoundCard>

        </Grid>
    </Grid>
   </Box>
  )
}

