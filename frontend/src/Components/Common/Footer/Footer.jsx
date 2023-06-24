// import { Box, Grid, Typography, IconButton } from '@mui/material';
// import React from 'react';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import Image from  '../../../Images/Yaksha-Logo-PNG (2).webp'

// function Footer() {
//   return (
//     <Box bgcolor="black"  marginTop={2} p={4} sx={{width:"100%"}}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6} md={3}>
//           <img src={Image} alt="" />
//           <Box display="flex" justifyContent="flex-start"  alignItems={'center'}>
//         <IconButton>
//           <FacebookIcon style={{ color: 'white', fontSize: 24 }} />
//         </IconButton>
//         <IconButton>
//           <TwitterIcon style={{ color: 'white', fontSize: 24 }} />
//         </IconButton>
//         <IconButton>
//           <InstagramIcon style={{ color: 'white', fontSize: 24 }} />
//         </IconButton>
//         <IconButton>
//           <LinkedInIcon style={{ color: 'white', fontSize: 24 }} />
//         </IconButton>
//       </Box>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3} sx={{xs:{textAlign:'center'}}}>
//           <Typography variant="h6" color="white">
//            Products
//           </Typography>
//           <ul style={{  padding: '0 16px' }}>
//             <li>
//               <Typography variant="body1" color="white">
//           Interview as Service
//               </Typography>
//             </li>
//             {/* Add more list items as needed */}
//           </ul>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" color="white">
//            Our Expert Intreview  panel
//           </Typography>
//           <ul style={{ listStyle: 'disc', padding: '0 16px' }}>
//             <li>
//               <Typography variant="body1" color="white">
//                 Becom An Expert
//               </Typography>
//             </li>
//             <li>
//               <Typography variant="body1" color="white">
//                 Expert Login
//               </Typography>
//               <Typography variant="body1" color="white">
//                 Company Login
//               </Typography>
//               <Typography variant="body1" color="white">
//                 Candiate Login
//               </Typography>
//             </li>
//             {/* Add more list items as needed */}
//           </ul>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" color="white">
//           Contact Info
//           </Typography>
//           <ul style={{ listStyle: 'disc', padding: '0 16px' }}>
//             <li>
//               <Typography variant="body1" color="white">
//                  Location:Kerala
//               </Typography>
//             </li>
//             <li>
//               <Typography variant="body1" color="white">
//                Emailid:verisync@gmail.com
//               </Typography>
//             </li>
//             {/* Add more list items as needed */}
//           </ul>
//         </Grid>
//       </Grid>
      
//     </Box>
//   )
// }

// export default Footer


import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#333', color: '#fff', py: 6,mt:4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
           <Box bgcolor={'#fff'} width={"150px"} height={"50px"}  >
          <img
            style={{ height: "50px", width: "150px" }}
            src="https://uploads-ssl.webflow.com/641c7ecdbeea3c8c8de5bc57/6422c156dfa505fbf90caeb7_IE%20logo%204.0.png"
            alt=""
          />
          </Box>
            <Box display="flex" justifyContent="flex-start" alignItems="center" marginTop={"2rem"}>
              <IconButton>
                <FacebookIcon style={{ color: 'white', fontSize: 24 }} />
              </IconButton>
              <IconButton>
                <TwitterIcon style={{ color: 'white', fontSize: 24 }} />
              </IconButton>
              <IconButton>
                <InstagramIcon style={{ color: 'white', fontSize: 24 }} />
              </IconButton>
              <IconButton>
                <LinkedInIcon style={{ color: 'white', fontSize: 24 }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h2" sx={{ mb: 3, fontFamily: 'Arial' }}>
              Products
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Typography variant="body2">
                  <Link href="/interview-service" color="inherit" sx={{textDecoration:"none"}}>
                    Interview as Service
                  </Link>
                </Typography>
              </li>
              {/* Add more list items as needed */}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h2" sx={{ mb: 3, fontFamily: 'Arial' }}>
              Our Expert  Panel
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li >
                <Typography variant="body2">
                  <Link href="/become_interviewexpert" color="inherit"sx={{textDecoration:"none"}}>
                    Become an Expert
                  </Link>
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <Link href="/login" color="inherit" sx={{textDecoration:"none"}}>
                    Expert Login
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="/login" color="inherit" sx={{textDecoration:"none"}}>
                    Company Login
                  </Link>
                </Typography>
                {/* <Typography variant="body2">
                  <Link href="/candidate-login" color="inherit" sx={{textDecoration:"none"}}>
                    Candidate Login
                  </Link>
                </Typography> */}
              </li>
              {/* Add more list items as needed */}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h2" sx={{ mb: 3, fontFamily: 'Arial' }}>
              Contact Info
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Typography variant="body2">
                  Location: Kerala
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Email: verisync@gmail.com
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: 'Arial' }}>
        © {new Date().getFullYear()} interviewXperts.com All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
