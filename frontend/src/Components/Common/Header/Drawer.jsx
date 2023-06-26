import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, useMediaQuery } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { logout } from "../../../Features/Slices/loginSlice";
import Logo from "../../../Images/interviewXpertslogo.png"

function Drawercomp() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const role = useSelector(
    (state) => state?.Login?.loginDetails?.matchedAccount?.role
  );
  const refreshToken = useSelector((state) => state?.Login?.refreshToken);
  const currentPage = useLocation();

  useEffect(() => {
    if (currentPage.pathname === "/") {
      dispatch(logout());
    }
  }, [currentPage, dispatch]);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const getPages = () => {
    if (role === "company" && refreshToken) {
      return [
        { label: "Home", path: "/company" },
        { label: "Add Request", path: "/company/add_request" },
        { label: "Feedback", path: "/company/student_details" },
        { label: "Plans", path: "/company/plans" },
        { label: "profile", path: "/company/profile" },
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
        {
          label: "Profile",
          path: "/interviewer/profile",
        },
      ];
    } else {
      return [
        { label: "Home", path: "/" },
        { label: "Interview As Service", path: "/interview_as_service" },
        { label: "Demo", path: "/demo" },
        { label: "Login", path: "/login" },
      ];
    }
  };

  const getSelectedTabValue = (pages) => {
    const currentPagePath = currentPage.pathname;
    const selectedIndex = pages.findIndex(
      (page) => page.path === currentPagePath
    );
    return selectedIndex >= 0 ? selectedIndex : 0;
  };

  const pages = getPages();
  const selectedTabValue = getSelectedTabValue(pages);
  return (
    <>
      <Drawer open={openDrawer} onClose={toggleDrawer} anchor="right">
        <List>
          <img
            style={{ height: "50px", width: "150px" }}
            src={Logo}
            alt=""
          />
          {pages.map((page, index) => (
            <Link
              to={page.path}
              key={index}
              style={{ textDecoration: "none", color: "#383838" }}
            >
              <ListItemButton onClick={toggleDrawer} alignItems="center">
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={page.label} sx={{ marginTop: "2rem" }} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default Drawercomp;
