import React from "react";
import axios from "axios";

const LoginContext = React.createContext();

const LoginState = (props) => {
    const [user,setUser] = React.useState(null);
    const logout = () => {
        axios.defaults.headers.common.Authorization = null;
        setUser(null);
    }
    const login = (userDetails)=>{
        axios.defaults.headers.common.Authorization = `Bearer ${userDetails.token}`;
        setUser(userDetails);
        setTimeout(()=>{
            logout();
        },20*60*1000);
    }
    return (
        <LoginContext.Provider value={{user,login,logout}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContext;
export {LoginState};