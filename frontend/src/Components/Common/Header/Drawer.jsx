import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const PAGES = ["Home", "Interview As Service", "Demo", "Login"];
function Drawercomp() {
  const [openDrawer, setopenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setopenDrawer(false)}
        anchor="right"
      >
        <List>
          <img
            style={{ height: "4rem", width: "6rem" }}
            src="https://yaksha.com/wp-content/uploads/2022/09/Yaksha-Logo-PNG.png"
            alt=""
          />

          {PAGES.map((page, index) => {
            return (
              <ListItemButton onClick={() => setopenDrawer(false)} key={index}>
                <ListItemIcon>
                  <ListItemText>{page}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setopenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
}

export default Drawercomp;
