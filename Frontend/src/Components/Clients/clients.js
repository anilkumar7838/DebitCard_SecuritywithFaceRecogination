import React from "react";
import "./clients.css";
import Logo1 from "../../Images/logo1.png";
import Logo2 from "../../Images/logo2.png";
import Logo3 from "../../Images/logo3.png";
import Logo4 from "../../Images/logo4.png";
import Logo5 from "../../Images/logo5.png";
import Logo6 from "../../Images/logo6.png";

//  ------------ Component : Clients/sponsors -------------

const Clients = React.forwardRef((props, ref) => {
  return (
    <>
    <section id="client-section" ref={ref}>
      <h1 class="h-primary center">Our Clients</h1>
      <div id="clients">
        <div class="client-item">
          <img src={Logo1} alt="Our Client" />
        </div>
        <div class="client-item">
          <img src={Logo2} alt="Our Client" />
        </div>
        <div class="client-item">
          <img src={Logo3} alt="Our Client" />
        </div>

        <div class="client-item">
          <img src={Logo4} alt="Our Client" />
        </div>
        <div class="client-item">
          <img src={Logo5} alt="Our Client" />
        </div>
        <div class="client-item">
          <img src={Logo6} alt="Our Client" />
        </div>
      </div>
    </section>
  </>
  )
})

export default Clients;
