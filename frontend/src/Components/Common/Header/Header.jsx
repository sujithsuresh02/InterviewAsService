import React, { useState } from "react";
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

let PAGES = [];
function Header() {
  const dispatch = useDispatch();
  const [value, setvalue] = useState(0);
  const refreshToken = useSelector((state) => state?.Login?.refreshToken);
  const role = useSelector(
    (state) => state?.Login?.loginDetails?.matchedAccount?.role
  );
  console.log(role);
  console.log("who is looged in");
  const roles = useSelector(
    (state) => state?.Login?.loginDetails?.matchedAccount?.name
  );
  console.log(roles);
  console.log("role");

  const theme = useTheme();
  const ismatch = useMediaQuery(theme.breakpoints.down("md"));

  const currentPage = useLocation();
  console.log(currentPage);
  console.log("currentpage");
  if (currentPage.pathname === "/") {
    dispatch(logout());
  }
  if (role === "company" && refreshToken) {
    PAGES = [
      { label: "Home", path: "/company" },
      { label: "Add Request", path: "/company/add_request" },
      { label: "Feedback", path: "/company/student_details" },
      { label: "Plans", path: "/company/plans" },
    ];
  } else if (role === "interviewer" && refreshToken) {
    PAGES = [
      { label: "Home", path: "/interviewer" },
      { label: "Interviews", path: "/interviewer/feedback" },
      { label: "AddTimeSlot", path: "/interviewer/add_timeslot" },
      { label: "CompletedInterviews", path: "/interviewer/completed_interviews" },
    ];
  } else {
    PAGES = [
      { label: "Home", path: "/" },
      { label: "Interview As Service", path: "/interview_as_service" },
      { label: "Demo", path: "/demo" },
    ];
  }

  return (
    <React.Fragment>
      <AppBar
        sx={{ backgroundColor: "white", boxShadow: "none", height: "10vh" }}
      >
        <Toolbar sx={{ padding: "1rem" }}>
          <img
            style={{ height: "4rem", width: "6rem" }}
            src="https://yaksha.com/wp-content/uploads/2022/09/Yaksha-Logo-PNG.png"
            alt=""
          />

          {ismatch ? (
            <Drawercomp />
          ) : (
            <>
              <Tabs
                textcolor="inherit"
                value={value}
                indicatorColor="secondary"
                onChange={(e, value) => setvalue(value)}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  "& .MuiTabs-flexContainer": {
                    justifyContent: "center",
                  },
                  "& .MuiTab-root": {
                    color: "black",
                  },
                }}
              >
                {PAGES.map((page, index) => (
                  <Link key={index} to={page.path}>
                    <Tab label={page.label} />
                  </Link>
                ))}
              </Tabs>

              <div>
                {(() => {
                  switch (true) {
                    case refreshToken && role && role === "company":
                      return (
                        <Link to="/company/profile">
                          <Button
                            variant="contained"
                            sx={{ marginLeft: "auto" }}
                          >
                            {roles}
                          </Button>
                        </Link>
                      );
                    case refreshToken && role && role === "interviewer":
                      return (
                        <Link to="/interviewer/profile">
                          <Button
                            variant="contained"
                            sx={{ marginLeft: "auto" }}
                          >
                            {roles}
                          </Button>
                        </Link>
                      );
                    default:
                      return (
                        <Link to="/login">
                          <Button
                            variant="contained"
                            sx={{ marginLeft: "auto" }}
                          >
                            Login
                          </Button>
                        </Link>
                      );
                  }
                })()}
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
