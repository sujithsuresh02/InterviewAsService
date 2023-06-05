import React from "react";
import Sidebar from "../../Components/Admin/Dashboard/Sidebar";
import UserTable from "../../Components/Admin/ViewDemo/getDemos";
import { Box,useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function ViewDemoPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDownScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  return (
   
      <Box >
        <Sidebar allTables={<UserTable  />}/>
          
        
      </Box>
    
  );
}
