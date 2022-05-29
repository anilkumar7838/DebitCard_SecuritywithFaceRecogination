import React,{useEffect, useRef} from "react";
import "./home.css";
import homeImage from "../../Images/background2.png";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import Contact from "../ContactUs/contact";
import Clients from "../Clients/clients";
import Imageslider from "../Imageslider/imageslider";
import { SliderData } from "../Imageslider/SliderData";
import { Link,useLocation } from "react-router-dom";

const scrollToRef = (ref) => {
  if(ref && ref.current){
    window.scrollTo(0, ref.current.offsetTop)   
  }
}
// ------------- Component: Home ----------------
const Home = (props) => {
  const location = useLocation();
  const references = {
    "clients":useRef(null),
    "contact":useRef(null),
    "slider":useRef(null),
  }
  useEffect(() => {
    if(location && location.state && location.state.location){
      scrollToRef(references[location.state.location])
    }
  },[location])
  return (
  <>
    <div className='primary-Container'>
        <div className="content">
          <h1>
            <span style={{ color: "#16d0c5" }}>Fa</span>ce{" "}
            <span style={{ color: "#16d0c5" }}>Reco</span>gnition
          </h1>
          <p>
          A web application which helps you to securely withdraw cash. 
          You just have click on the login button, enter the details and get authenticated.
          You can also perform various other functions like transfer fund, generate mini-statement, get account details.
          </p>
          <Link to="/login">
            <button className="primary-btn">Get Started</button>
          </Link>
        </div>
        <div className="homeImage">
          <img src={homeImage} alt="sorry" />
        </div>
      </div>
      <Clients id="clients" ref={references.clients}/>
      <Imageslider slides={SliderData} ref={references.slider} />
      <Contact ref={references.contact}/>
      <Footer />
    </>
  );
};

export default Home;
