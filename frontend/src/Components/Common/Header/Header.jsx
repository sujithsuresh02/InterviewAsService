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
  Tooltip,
} from "@mui/material";
import Drawercomp from "./Drawer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../Features/Slices/loginSlice";
import Logo from "../../../Images/interviewXpertslogo.png";
import ChatIcon from "@mui/icons-material/Chat";
import {
  editProfile,
  getSignupData,
  paymentHistory,
} from "../../../Features/Slices/companySlice/Companyprofile";
import { initateChat } from "../../../Features/Slices/companySlice/companySlice";
import EditProfile from "../../Interviewer/profile/Editprofile";
import { getInterviewerDetails } from "../../../Features/Slices/Interviewer/Interviewer";
let roles = null;
let subscriptionHistory = null;
let isSubscriptionActive = null;
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const refreshToken = useSelector((state) => state?.commonLogin?.refreshToken);
  const role = useSelector(
    (state) => state?.commonLogin?.loginDetails?.matchedAccount?.role
  );

  roles = useSelector(
    (state) => state?.commonLogin?.loginDetails?.matchedAccount?.name
  );

  if (role === "company") {
    useEffect(() => {
      dispatch(getSignupData());
    }, [getSignupData]);

  }
  if (role === "interviewer") {
    useEffect(() => {
      dispatch(getInterviewerDetails());
    }, [getInterviewerDetails]);
    roles = useSelector(
      (state) => state?.interviwer?.interviewerDetails?.result?.name
    );
  }

  const companyId = useSelector(
    (state) => state?.commonLogin?.loginDetails?.matchedAccount?.id
  );
  console.log(companyId, "companyId");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(paymentHistory());
  }, [dispatch, paymentHistory]);

  subscriptionHistory = useSelector((state) => state?.profile?.paymentHistory);

  const handleChatIconClick = () => {
    dispatch(initateChat({ senderId: companyId }));
    navigate("/chat");
  };
  const getPages = () => {
    if (role === "company" && refreshToken) {
      isSubscriptionActive = subscriptionHistory?.length > 0;
      console.log(isSubscriptionActive, "is");
      return [
        { label: "Home", path: "/company" },
        {
          label: "Add Request",
          path: "/company/add_request",
          style: {
            color: isSubscriptionActive ? "inherit" : "rgba(0, 0, 0, 0.5)",
            cursor: isSubscriptionActive === true ? "pointer" : "not-allowed",
            pointerEvents: isSubscriptionActive ? "auto" : "none",
          },
          disabled: isSubscriptionActive,
        },
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
                  <React.Fragment key={index}>
                    {page.path === "/company/add_request" &&
                    !isSubscriptionActive ? (
                      <Tooltip title="Add Request is disabled">
                        <span>
                          <Tab
                            label={page.label}
                            style={{
                              color: "rgba(0, 0, 0, 0.5)",
                              cursor: "not-allowed",
                              pointerEvents: "none",
                            }}
                          />
                        </span>
                      </Tooltip>
                    ) : (
                      <Link to={page.path}>
                        <Tab label={page.label} />
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </Tabs>
              {refreshToken && role === "company" && (
                <Box sx={{ marginLeft: "auto", marginRight: "3rem" }}>
                  <Tooltip title="chat">
                    <ChatIcon
                      color="primary"
                      onClick={() => handleChatIconClick(companyId)}
                    />
                  </Tooltip>
                </Box>
              )}
              <div>
                {refreshToken && role === "company" && (
                  <Link to="/company/profile">
                    <Button variant="contained" sx={{ marginLeft: "auto" }}>
                      {refreshToken && role ? roles : "login"}
                    </Button>
                  </Link>
                )}
                {refreshToken && role === "interviewer" && (
                  <Link to="/interviewer/profile">
                    <Button variant="contained" sx={{ marginLeft: "auto" }}>
                      {refreshToken && role ? roles : "login"}
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
