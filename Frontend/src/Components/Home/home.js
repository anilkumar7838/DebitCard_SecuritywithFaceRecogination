import React from 'react'
import "./home.css"
import homeImage from "../../Images/background2.png"
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Contact from '../ContactUs/contact';

const Home = () => {
  return (
  <>
    <Header/>
    <div className='primary-Container'>
        <div className="content">
            <h1><span style={{color: "#16d0c5"
            }}>Fa</span>ce <span style={{color: "#16d0c5"}}>Reco</span>gination</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Atque quidem, rem dolorum cum voluptas quod distinctio 
                consequatur magni ducimus.
                Aperiam laborum temporibus dolore ex dolorem? Modi placeat
                totam corrupti doloribus sapiente. 
                Inventore, quas similique.
            </p>
            <a href='/login'>
                <button className="primary-btn" >
                    Get Started
                </button>
            </a>
        </div>
        <div className="homeImage">
            <img src={homeImage} alt="sorry" />
        </div>
    </div>
    <Contact/>
    <Footer/>
   </>
  )
}

export default Home