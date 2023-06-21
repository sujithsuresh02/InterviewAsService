import React from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import { useTheme } from "@mui/material/styles";
import { logout } from "../../../Features/Slices/loginSlice";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = styled(Paper)(({ theme }) => ({

  height: "100%",
  padding: theme.spacing(2),
}));

const Content = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Profilesidebar = ({ pages }) => {
  const theme = useTheme();
  const dispatch = useDispatch();


  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );

  const handleLogout = () => {
    console.log('nvn');
    dispatch(logout());
  };

  const currentPage = useLocation();
  console.log(currentPage);
  console.log("currentpage");
  if (currentPage.pathname === "/") {
    dispatch(logout());
  }
  return (
    <Container
      maxWidth="lg"
      sx={{ marginTop: isSmallScreen ? "10rem" : "8rem" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Sidebar sx={{height:"fit-content"}}>
            <List component="nav" aria-label="Settings">
              <Link to={"/company/profile"} style={{ textDecoration: "none" ,color:'gray'}}>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary=" Edit Profile" />
                </ListItem>
              </Link>
              <Link
                to={"/company/subscription_history"}
                style={{ textDecoration: "none",color:'gray' }}
              >
                <ListItem>
                  <ListItemIcon>
                    <PaymentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payment History" />
                </ListItem>
              </Link>
              
              <Link  style={{ textDecoration: "none",color:'gray' }}>
                <ListItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout " />
                </ListItem>
              </Link>
            </List>
          </Sidebar>
        </Grid>
        <Grid item xs={12} md={9}>
          <Content>{pages}</Content>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profilesidebar;
