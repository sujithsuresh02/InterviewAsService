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
} from "@mui/material";
import Drawercomp from "./Drawer";
import SignupForm from "../auth/Signupform";
import Loginform from "../auth/Login";
const PAGES = ["Home", "Interview As Service", "Demo"];

function Header() {
  const [value, setvalue] = useState(0);
  const [open, setOpen] = useState(false);
  const [Loginopen, setLoginOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleloginClose = () => {
    console.log('hlo header')
    setLoginOpen(false);
  };

  const handleLogin = () => {
    setLoginOpen(true);
    console.log("kflfkg");
  };

  const theme = useTheme();
  const ismatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: "white",boxShadow:"none" }}>
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
                sx={{ marginLeft: "auto" }}
                textcolor="inherit"
                value={value}
                indicatorColor="secondary"
                onChange={(e, value) => setvalue(value)}
              >
                {PAGES.map((page, index) => {
                  return <Tab label={page} />;
                })}
              </Tabs>
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{ marginLeft: "auto" }}
              >
                Login
              </Button>
              <SignupForm
                open={open}
                handleClose={handleClose}
                Loginopen={handleLogin}
              />
              <Loginform Loginopen={Loginopen} Loginclose={handleloginClose} Signupopen={handleOpen} />
            </>
          )}

          {/* <Typography></Typography> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
