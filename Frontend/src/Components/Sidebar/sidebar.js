import React from "react";
import "./sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import{FaHome} from "react-icons/fa"
// import{FcAbout} from "react-icons/fc"
import{FiPhoneCall} from "react-icons/fi"
// import{FiLogOut} from "react-icons/fi"
import{FiSettings} from "react-icons/fi"
import {BsQuestionCircle} from "react-icons/bs"
// import { urlencoded } from "body-parser";
// import { fontSize } from "@mui/system";

const Sidebar = () => {
  const [state, setState] = React.useState(false);

const togglesidebar = (side, open) => (event) => {
    setState({ ...state, [side]: open });
};

const closeNav=()=>{
    setState(!state);
}
const MenuTabs = (item) => {
    return(
    <div className="container">
    <div className="closebtn" ><span onClick={closeNav}>&times;</span></div>
    <div style={{ width: "250px" }} >
        <List style={{width:"250px",height:"100px"}}>
          <ListItem>
                <ListItemText style={{fontSize:"48px",marginLeft:"20px"}}>
                    <span className="list_style" style={ {fontSize:"35px",fontWeight:"1000"}}>F</span>
                    <span className="list_style" style={{fontWeight:"700"}}>eatures</span>
                </ListItemText>
          </ListItem>
        </List>

        <Divider className="divider"/>

        <List style={{marginLeft:"8px",marginRight:"8px",marginTop:"15px"}}>
            <ListItem className="list_item" onClick={closeNav}>
                <div className="img_style" ><FaHome/><span>Home</span></div>
            </ListItem>
            <ListItem className="list_item" onClick={closeNav}>
                <div className="img_style" ><MonetizationOnIcon className="material-icons"/><span>Pricing</span></div>
            </ListItem>
            <ListItem className="list_item" onClick={closeNav}>
                <div className="img_style" ><AccessibilityIcon className="material-icons"/> <span>User Guide</span></div>
            </ListItem>
            <ListItem className="list_item" onClick={closeNav}>
                <div className="img_style" ><FiPhoneCall/><span>Contact</span></div>
            </ListItem>
        </List>
        <Divider className="divider"/>
        <List style={{marginLeft:"8px",marginRight:"8px",marginTop:"15px"}}>
            <ListItem className="list_item" onClick={closeNav}>
                <FiSettings/>
                <div style={{marginLeft:"20px",fontSize:"14px"}} >Settings</div>
            </ListItem>
            <ListItem className="list_item" onClick={closeNav}>
                <BsQuestionCircle/>
                <div style={{marginLeft:"20px",fontSize:"14px",fontWeight:"500"}} >Help & FeedBack</div>
            </ListItem>
        </List>

        <Divider className="divider"/>
        <List style={{marginLeft:"8px",marginRight:"8px",marginTop:"15px"}}>
            {/* <ListItem className="list_item" onClick={closeNav}>
            <FiLogOut/><div style={{marginLeft:"20px",fontSize:"14px"}}><span>LogOut</span></div>
            </ListItem> */}
            <ListItem className="list_item" onClick={closeNav}>
                <AppRegistrationIcon/><div style={{marginLeft:"20px",fontSize:"14px"}}><span>Register</span></div>
            </ListItem>
            <ListItem className="list_item" onClick={closeNav}>
                <LoginIcon/>
                <div style={{marginLeft:"20px",fontSize:"14px"}}><span>LogIn</span></div>
            </ListItem>
        </List>
        <Divider className="divider"/>
    </div>
    </div>
  )
  };

  return (
    <>
        <IconButton onClick={togglesidebar("right", true)}>
            <MenuIcon />
        </IconButton>
        <Drawer
            open={state["right"]}
            onClose={togglesidebar("right", false)}
            side={"right"}
        >
            <MenuTabs/>
        </Drawer>
    </>
  );
};

export default Sidebar;