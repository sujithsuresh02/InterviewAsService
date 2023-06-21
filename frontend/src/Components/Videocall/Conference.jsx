import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "./Peer";
import Footer from "./Footer";
import { styled, Box, Grid } from "@mui/material";
import VideoTile from "./Videotile";
const ConferenceSection = styled(Box)`
  background: #000000;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const PeerContainer = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: ${({ theme }) => theme.spacing(35)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const PeerBox = styled(Box)`
  background: #ffffff;
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <ConferenceSection>
      <h2>Conference</h2>

      <PeerContainer container>
        {peers.map((peer) => (
          <Grid item key={peer.id} xs={4} sm={6} md={4} lg={4} xl={2}>
            <Peer peer={peer} />
          </Grid>
        ))}
      </PeerContainer>
  <VideoTile peer={Peer}/>
      <Footer />
    </ConferenceSection>
  );
}

export default Conference;
