import React from 'react'
import './contact.css';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  return (
        <section className='contact-main'>
            <div className="contact-content">
                <h2>Contact Us</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae minima officiis dolore veritatis maiores ipsa est quis laudantium. Vero cum corrupti veniam earum ab.</p>
            </div>
            <div className="contact-container">
                <div className="contactInfo">
                    <div className="contact-box">
                        <div className="icon">
                        <LocationOnIcon/>
                        </div>
                        <div className="text">
                            <h3>Address</h3>
                            <p>C-1/35 Dwarka sec-16,New Delhi</p>
                        </div>
                    </div>
                    <div className="contact-box">
                        <div className="icon">
                        <PhoneForwardedIcon/>
                        </div>
                        <div className="text">
                            <h3>Mb.Number</h3>
                            <p>7838180782</p>
                        </div>
                    </div>
                    <div className="contact-box">
                        <div className="icon"><MailIcon/>
                        </div>
                        <div className="text">
                            <h3>Email</h3>
                            <p>akreal7838@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="contactForm">
                    <form>
                        <h2>Send Message</h2>
                        <div className="inputBox">
                            <input type="text" name="" required/>
                            <span>Full Name</span>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="" required/>
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <textarea required></textarea>
                            <span>Type your Message..</span>
                        </div>
                        <div className="inputBox">
                            <input type="Submit" name="" value="Send"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Contact