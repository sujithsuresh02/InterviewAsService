import React, { useState, useEffect } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import Drawercomp from "./Drawer";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../../Features/Slices/loginSlice";
let pages = [];

const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const refreshToken = useSelector((state) => state?.Login?.refreshToken);
  const role = useSelector(
    (state) => state?.Login?.loginDetails?.matchedAccount?.role
  );
  const roles = useSelector(
    (state) => state?.Login?.loginDetails?.matchedAccount?.name
  );
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const currentPage = useLocation();

  useEffect(() => {
    if (currentPage.pathname === "/") {
      dispatch(logout());
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (role === "company" && refreshToken) {
      pages = [
        { label: "Home", path: "/company" },
        { label: "Add Request", path: "/company/add_request" },
        { label: "Feedback", path: "/company/student_details" },
        { label: "Plans", path: "/company/plans" },
      ];
    } else if (role === "interviewer" && refreshToken) {
      pages = [
        { label: "Home", path: "/interviewer" },
        { label: "Interviews", path: "/interviewer/feedback" },
        { label: "Add Time Slot", path: "/interviewer/add_timeslot" },
        {
          label: "Completed Interviews",
          path: "/interviewer/completed_interviews",
        },
      ];
    } else {
      pages = [
        { label: "Home", path: "/" },
        { label: "Interview As Service", path: "/interview_as_service" },
        { label: "Demo", path: "/demo" },
      ];
    }
    setValue(getSelectedTabValue(pages));
  }, [role, refreshToken]);

  const getSelectedTabValue = (pages) => {
    const currentPagePath = currentPage.pathname;
    const selectedIndex = pages.findIndex((page) => page.path === currentPagePath);
    return selectedIndex >= 0 ? selectedIndex : 0;
  };
  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: "#f8f8f8" }}>
        <Toolbar sx={{ padding: "1rem" }}>
          <img
            style={{ height: "50px", width: "150px" }}
            src="https://uploads-ssl.webflow.com/641c7ecdbeea3c8c8de5bc57/6422c156dfa505fbf90caeb7_IE%20logo%204.0.png"
            alt=""
          />

          {isMatch ? (
            <Drawercomp />
          ) : (
            <>
              <Tabs
                value={value}
                indicatorColor="secondary"
                onChange={(_, newValue) => setValue(newValue)}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  "& .MuiTabs-flexContainer": {
                    justifyContent: "center",
                  },
                  "& .MuiTab-root": {
                    color: "black",
                    fontFamily: "Arial, sans-serif",
                  },
                }}
              >
                {pages?.map((page, index) => (
                  <Link key={index} to={page.path}>
                    <Tab label={page.label} />
                  </Link>
                ))}
              </Tabs>

              <div>
                {refreshToken && role === "company" && (
                  <Link to="/company/profile">
                    <Button variant="contained" sx={{ marginLeft: "auto" }}>
                      {roles}
                    </Button>
                  </Link>
                )}
                {refreshToken && role === "interviewer" && (
                  <Link to="/interviewer/profile">
                    <Button variant="contained" sx={{ marginLeft: "auto" }}>
                      {roles}
                    </Button>
                  </Link>
                )}
                {!refreshToken && (
                  <Link to="/login">
                    <Button variant="contained" sx={{ marginLeft: "auto" }}>
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
