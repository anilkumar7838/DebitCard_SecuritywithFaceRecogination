import React, { useContext } from "react";
import "./sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AppsIcon from "@mui/icons-material/Apps";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoginIcon from "@mui/icons-material/Login";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LoginContext from "../Login/LoginContext";
import { useNavigate, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();
  const logincontext = useContext(LoginContext);
  const togglesidebar = (side, open) => (event) => {
    setState({ ...state, [side]: open });
  };

  const closeNav = () => {
    setState(!state);
  };
  const MenuTabs = (item) => {
    return (
      <div className="container">
        <div className="closebtn">
          <span onClick={closeNav}>&times;</span>
        </div>
        <div style={{ width: "250px" }}>
          <List style={{ width: "250px", height: "100px" }}>
            <ListItem>
              <ListItemText style={{ fontSize: "48px", marginLeft: "20px" }}>
                <span
                  className="list_style"
                  style={{ fontSize: "35px", fontWeight: "1000" }}
                >
                  F
                </span>
                <span className="list_style" style={{ fontWeight: "700" }}>
                  eatures
                </span>
              </ListItemText>
            </ListItem>
          </List>

          <Divider className="divider" />

                    <List style={{ marginLeft: "8px", marginRight: "8px", marginTop: "15px" }}>
                        <ListItem className="list_item" onClick={()=>{navigate("/");closeNav();}}>
                            <div className="img_style" ><FaHome /><span>Home</span></div>
                        </ListItem>
                        <ListItem className="list_item" onClick={()=>{navigate("/",{state:{location:"clients"}});closeNav();}}>
                            <div className="img_style" ><GroupsIcon /><span>Clients</span></div>
                        </ListItem>
                        <ListItem className="list_item" onClick={()=>{navigate("/",{state:{location:"slider"}});closeNav();}}>
                            <div className="img_style" ><InfoIcon /><span>About Us</span></div>
                        </ListItem>
                        <ListItem className="list_item" onClick={()=>{navigate("/",{state:{location:"contact"}});closeNav();}}>
                            <div className="img_style" ><CallIcon /><span>Contact Us</span></div>
                        </ListItem>
                    </List>
                    <Divider className="divider" />
                    
                        {
                            logincontext.user ?
                                <>
                    <List style={{ marginLeft: "12px", marginRight: "8px", marginTop: "15px" }}>
                                    <ListItem key={1} className="list_item" onClick={()=>{navigate("/transaction");closeNav();}}>
                                        <div className="img_style" ><AppsIcon className="material-icons" /><span>All Features</span></div>
                                    </ListItem>
                                    <ListItem key={2} className="list_item" onClick={()=>{navigate("/details");closeNav();}}>
                                        <div className="img_style" ><ManageAccountsIcon className="material-icons" /><span>Account Details</span></div>
                                    </ListItem>
                                    <ListItem key={3} className="list_item" onClick={()=>{navigate("/ministatement");closeNav();}}>
                                        <div className="img_style" ><DescriptionIcon className="material-icons" /><span>Mini statement</span></div>
                                    </ListItem>
                                    <ListItem key={4} className="list_item" style={{marginLeft:"-10px"}} onClick={()=>{navigate("/cashwithdraw");closeNav();}}>
                                        <div className="img_style" ><AttachMoneyIcon /><span>Cash Withdraw</span></div>
                                    </ListItem>
                                    <ListItem key={5} className="list_item" style={{marginLeft:"-8px"}} onClick={()=>{navigate("/fundtransfer");closeNav();}}>
                                        <div className="img_style" ><CurrencyExchangeIcon /><span>Fund Transfer</span></div>
                                    </ListItem>
                                </List>
                                </>
                                : null
                            }
                            <Divider className="divider" />

          {logincontext.user ? (
            <>
              <List
                style={{
                  marginLeft: "12px",
                  marginRight: "8px",
                  marginTop: "15px",
                }}
              >
                <ListItem
                  className="list_item"
                  onClick={() => {
                    navigate("/transactions");
                    closeNav();
                  }}
                >
                  <div className="img_style">
                    <AppsIcon className="material-icons" />
                    <span>All Features</span>
                  </div>
                </ListItem>
                <ListItem
                  className="list_item"
                  onClick={() => {
                    navigate("/details");
                    closeNav();
                  }}
                >
                  <div className="img_style">
                    <ManageAccountsIcon className="material-icons" />
                    <span>Account Details</span>
                  </div>
                </ListItem>
                <ListItem
                  className="list_item"
                  onClick={() => {
                    navigate("/ministatement");
                    closeNav();
                  }}
                >
                  <div className="img_style">
                    <DescriptionIcon className="material-icons" />
                    <span>Mini statement</span>
                  </div>
                </ListItem>
                <ListItem
                  className="list_item"
                  style={{ marginLeft: "-10px" }}
                  onClick={() => {
                    navigate("/cashwithdraw");
                    closeNav();
                  }}
                >
                  <div className="img_style">
                    <AttachMoneyIcon />
                    <span>Cash Withdraw</span>
                  </div>
                </ListItem>
                <ListItem
                  className="list_item"
                  style={{ marginLeft: "-8px" }}
                  onClick={() => {
                    navigate("/fundtransfer");
                    closeNav();
                  }}
                >
                  <div className="img_style">
                    <CurrencyExchangeIcon />
                    <span>Fund Transfer</span>
                  </div>
                </ListItem>
              </List>
            </>
          ) : null}
          <Divider className="divider" />

          <List
            style={{ marginLeft: "8px", marginRight: "8px", marginTop: "15px" }}
          >
            {logincontext.user ? (
              <ListItem
                className="list_item"
                onClick={() => {
                  logincontext.logout();
                  navigate("/");
                  closeNav();
                }}
              >
                <LogoutIcon />
                <div style={{ marginLeft: "20px", fontSize: "14px" }}>
                  <span>Log Out</span>
                </div>
              </ListItem>
            ) : (
              <ListItem
                className="list_item"
                onClick={() => {
                  navigate("/login");
                  closeNav();
                }}
              >
                <LoginIcon />
                <div style={{ marginLeft: "20px", fontSize: "14px" }}>
                  <span>Log In</span>
                </div>
              </ListItem>
            )}
          </List>
          <Divider className="divider" />
        </div>
      </div>
    );
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
        <MenuTabs />
      </Drawer>
    </>
  );
};

export default Sidebar;
