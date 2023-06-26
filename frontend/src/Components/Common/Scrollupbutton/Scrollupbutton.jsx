import React, { useState, useEffect } from "react";
import { IconButton, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the scroll button when the user scrolls down
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={isVisible}>
      <div
        onClick={scrollToTop}
        role="presentation"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
        }}
      >
        <IconButton
          size="large"
          aria-label="Scroll to top"
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </div>
    </Zoom>
  );
}

export default ScrollButton;
