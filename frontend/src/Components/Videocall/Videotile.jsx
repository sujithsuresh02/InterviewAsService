import React, { useState } from 'react';
import { styled } from '@mui/material';

const VideoTileContainer = styled('div')`
  position: relative;
`;

const VideoElement = styled('video')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FullscreenButton = styled('button')`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const VideoTile = ({ peer }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const enterFullscreen = () => {
    const videoElement = document.getElementById(`video-${peer.id}`);
    if (videoElement && videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <VideoTileContainer>
      <FullscreenButton onClick={handleFullscreenToggle}>
        {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </FullscreenButton>
      <VideoElement id={`video-${peer.id}`} autoPlay playsInline />
    </VideoTileContainer>
  );
};

export default VideoTile;
