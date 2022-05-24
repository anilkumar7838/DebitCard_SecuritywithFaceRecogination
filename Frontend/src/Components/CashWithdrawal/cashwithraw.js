import React from "react";
import "./cashwithdraw.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const Cashwithraw = () => {
    
    const notify = ()=>{
        toast(" Congratulation! cash Withdrawal Successfully ", {position:"top-center"});
    }

  return (
    <div className="cash-main">
      <div className="cash-form">
        <h2>Cash Withdraw</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum itaque
          ipsa dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Amet, illo! Incidunt, ratione?
        </p>
        <form action="" onSubmit={(e)=>{
            e.preventDefault();
        }}>
          <input type="number" className="Amount" name="amount" placeholder="Enter the Amount"/>
          <input type="submit"  className="cash-btn" onClick={notify} value="Confirm" />
        </form>
      </div>
    <ToastContainer/>
    </div>
  );
};

export default Cashwithraw;
