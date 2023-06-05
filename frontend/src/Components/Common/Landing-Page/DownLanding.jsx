import React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import RoundCards from './Roundcard';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function DownLanding() {
  return (
    <Box bgcolor={"#f8f9fa"} marginTop={20}>
      <Grid container justifyContent="center"  maspacing={2}>
        <Grid item xs={false} sm={false} md={2} />
        <Grid item xs={12} sm={8} md={8}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} >
              <Typography
                variant='h2'
                sx={{
                  fontSize: "3rem",
                  fontWeight: "600",
                  color: "#080a3c",
                  fontFamily: "Poppins,sans-serif",
                  marginTop: "1.5rem",
                  textAlign: "center",
                }}
              >
                You Can Trust Us With Your Hiring!
              </Typography>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={12} md={4} marginTop={9} sx={{ display: "flex", justifyContent: "center" }}>
                <RoundCards transition={false} Icon={GroupsIcon} count="1000+" description="Interview Scheduled" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={9} sx={{ display: "flex", justifyContent: "center" }}>
                <RoundCards transition={false} Icon={ThumbsUpDownIcon} count="4.5" description="Avg Interview Quality Rating" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={9} sx={{ display: "flex", justifyContent: "center" }}>
                <RoundCards transition={false} Icon={GroupAddIcon} count="4.55" description="Avg Candidate Experience" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={9} sx={{ display: "flex", justifyContent: "center" }}>
                <RoundCards transition={false} Icon={GroupIcon} count="460+" description="Highly Qualified Interviewers" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={9} sx={{ display: "flex", justifyContent: "center" }}>
                <RoundCards transition={false} Icon={FeedbackIcon} count="2Hrs" description="TAT for detailed feedback" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={false} md={2} />
      </Grid>
    </Box>
  );
}
