import React from 'react'
import Sidebar from '../Sidebar/sidebar'
import "./header.css"
// import { IconButton } from '@mui/material'
// import Img from '../../Image/logo.jpg'


const header = () => {
    return (
        // <div className='header-container'>
          <div className="header">
            <div className="header_info">
                <div className="info">
                  Face<span style={{color: "#000"}}>Mania</span>
                </div>
            </div>  
            <div className="list_style">
                <ul class="menuList">
                    <li><a href="/">Solutions</a></li>
                    <li><a href="/">User Guide</a></li>
                    <li><a href="/">Pricing</a></li>
                    <li><a href="/">Contact Us</a></li>
                </ul>
            </div>
            <div className="header_right">
              <button className="header-btn" id="login">Login</button>
              <button className="header-btn" id="register">Register</button>
              <Sidebar className="sideBar"/>
            </div>  

          </div>
    )
}

export default header
