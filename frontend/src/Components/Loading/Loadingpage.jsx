import React from "react";
import { RingLoader } from "react-spinners";

export const LoadingPage = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
    }}
  >
    <RingLoader color="blue" size={80} />
  </div>
);
