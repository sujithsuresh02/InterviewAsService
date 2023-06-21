



import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Link} from "react-router-dom"
 import {logout} from "../../../Features/Slices/Admin/adminLogin"
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width:`calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
  
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);





const SideBar = ({allTables}) => {
    const dispatch = useDispatch()
  const theme = useTheme();
  let phoneview= useMediaQuery(theme.breakpoints.down("md"))
  const [open, setOpen] = React.useState(true);


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  
 useEffect(() => {
 
   if(phoneview){
    setOpen(false)
  }
 },[])
 
  
 const handlelogout=()=>{
dispatch(logout())
 }
return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline  />
      <AppBar position="fixed" open={open}  >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ marginTop: '2rem' }}>
  <DrawerHeader>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  </DrawerHeader>
  <Divider />
  <List>
    <Link to={"/admin"} style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="DashBoard" sx={{ color: "grey", textDecoration: "none" }} />
      </ListItemButton>
    </Link>
    <Link to={"/admin/view_request"} style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="View Request" sx={{ color: "grey" }}/>
      </ListItemButton>
    </Link>
    <Divider />
    <Link to={"/admin/interviews"} style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <AccessTimeIcon />
        </ListItemIcon>
        <ListItemText primary="view Interviews"sx={{ color: "grey"}} />
      </ListItemButton>
    </Link>
    <Link to={"/admin/student_details"}style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="View Students" sx={{ color: "grey" }}/>
      </ListItemButton>
    </Link>
    <Link to={"/admin/view_demo"} style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <EventAvailableIcon />
        </ListItemIcon>
        <ListItemText primary="Demo Requests" sx={{ color: "grey"}}/>
      </ListItemButton>
    </Link>
    <Link to={"/admin/add_plans"} style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <EventAvailableIcon />
        </ListItemIcon>
        <ListItemText primary="add plans" sx={{ color: "grey"}}/>
      </ListItemButton>
    </Link>
    <Link to={"/admin/view_plans"} style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <EventAvailableIcon />
        </ListItemIcon>
        <ListItemText primary="View Plans" sx={{ color: "grey"}}/>
      </ListItemButton>
    </Link>
    <Link to={"/admin/view_interviewers"} style={{textDecoration:"none"}}>
      <ListItemButton sx={{ marginTop: "25px" }}>
        <ListItemIcon>
          <EventAvailableIcon />
        </ListItemIcon>
        <ListItemText primary="Interviewers " sx={{ color: "grey"}}/>
      </ListItemButton>
    </Link>
    <ListItemButton sx={{ marginTop: "25px" }} onClick={handlelogout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" sx={{ color: "grey" }}  />
    </ListItemButton>
  </List>
</Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 ,overflowX:"auto"}}>
        <DrawerHeader />
        {allTables}
      </Box>
    </Box>
  );
}

export default SideBar