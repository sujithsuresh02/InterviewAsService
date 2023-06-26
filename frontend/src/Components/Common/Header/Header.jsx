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
} from "@mui/material";
import Drawercomp from "./Drawer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../Features/Slices/loginSlice";
import Logo from "../../../Images/interviewXpertslogo.png";

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

  const getPages = () => {
    if (role === "company" && refreshToken) {
      return [
        { label: "Home", path: "/company" },
        { label: "Add Request", path: "/company/add_request" },
        { label: "Feedback", path: "/company/student_details" },
        { label: "Plans", path: "/company/plans" },
      ];
    } else if (role === "interviewer" && refreshToken) {
      return [
        { label: "Home", path: "/interviewer" },
        { label: "Interviews", path: "/interviewer/feedback" },
        { label: "Add Time Slot", path: "/interviewer/add_timeslot" },
        {
          label: "Completed Interviews",
          path: "/interviewer/completed_interviews",
        },
      ];
    } else {
      return [
        { label: "Home", path: "/" },
        { label: "Interview As Service", path: "/interview_as_service" },
        { label: "Demo", path: "/demo" },
      ];
    }
  };

  useEffect(() => {
    const pages = getPages();
    const currentPath = window.location.pathname;
    const selectedIndex = pages.findIndex((page) => page.path === currentPath);
    setValue(selectedIndex >= 0 ? selectedIndex : 0);
  }, [refreshToken, role]);

  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: "#ffff", boxShadow: "none" }}>
        <Toolbar sx={{ padding: "1rem" }}>
          <img style={{ height: "50px", width: "150px" }} src={Logo} alt="" />

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
                {getPages()?.map((page, index) => (
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
