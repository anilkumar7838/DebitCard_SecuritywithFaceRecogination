import React from 'react'
import playstore from "../../Images/playstore.png";
import microsoftStore from "../../Images/microsoftStore.png";
import "./footer.css";

const footer = () => {
  return (
    <footer>
        <div className="leftfooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt="playstore"/>
            <img src={microsoftStore} alt="Appstore"/>
        </div>
        <div className="midfooter">
            <h1 id="logo">FaceMania</h1>
            <p>Advance security is our first Priority</p>
            <p>Copyrights 2022 &copy; Akdev</p>
        </div>
        <div className="rightfooter">
            <h4>Follow Us</h4>
            <a href="">Instagram</a>
            <a href="">Youtube</a>
            <a href="">Facebook</a>
        </div>
    </footer>
  )
}

export default footer