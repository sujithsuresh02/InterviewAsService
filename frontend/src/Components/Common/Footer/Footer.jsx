import { Box, Grid, Typography, IconButton } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from  '../../../Images/Yaksha-Logo-PNG (2).webp'

function Footer() {
  return (
    <Box bgcolor="black"  marginTop={15} p={4} sx={{width:"100%"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <img src={Image} alt="" />
          <Box display="flex" justifyContent="flex-start"  alignItems={'center'}>
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
        <Grid item xs={12} sm={6} md={3} sx={{xs:{textAlign:'center'}}}>
          <Typography variant="h6" color="white">
           Products
          </Typography>
          <ul style={{  padding: '0 16px' }}>
            <li>
              <Typography variant="body1" color="white">
          Interview as Service
              </Typography>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" color="white">
           Our Expert Intreview  panel
          </Typography>
          <ul style={{ listStyle: 'disc', padding: '0 16px' }}>
            <li>
              <Typography variant="body1" color="white">
                Becom An Expert
              </Typography>
            </li>
            <li>
              <Typography variant="body1" color="white">
                Expert Login
              </Typography>
              <Typography variant="body1" color="white">
                Company Login
              </Typography>
              <Typography variant="body1" color="white">
                Candiate Login
              </Typography>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" color="white">
          Contact Info
          </Typography>
          <ul style={{ listStyle: 'disc', padding: '0 16px' }}>
            <li>
              <Typography variant="body1" color="white">
                 Location:Kerala
              </Typography>
            </li>
            <li>
              <Typography variant="body1" color="white">
               Emailid:verisync@gmail.com
              </Typography>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </Grid>
      </Grid>
      
    </Box>
  )
}

export default Footer