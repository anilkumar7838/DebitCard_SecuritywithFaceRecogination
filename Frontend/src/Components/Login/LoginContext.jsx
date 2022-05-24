import React from "react";
import axios from "axios";

const LoginContext = React.createContext();

let user = null;
const logout = () => {
    axios.defaults.headers.common.Authorization = null;
    user = null;
}
const login = (userDetails)=>{
    axios.defaults.headers.common.Authorization = `Bearer ${userDetails.token}`;
    user = userDetails;
    setTimeout(()=>{
        logout();
    },20*60*1000);
}

export {user,login,logout,LoginContext};