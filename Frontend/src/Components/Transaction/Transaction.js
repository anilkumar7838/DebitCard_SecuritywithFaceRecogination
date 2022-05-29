import React from "react";
import {Link, Navigate} from "react-router-dom";
import "./Transaction.css";
import Footer from "../Footer/footer";
import LoginContext from "../Login/LoginContext";
import { useNavigate } from "react-router-dom";
const Transaction = () => {
  const logincontext = React.useContext(LoginContext);
  const navigate = useNavigate();
  React.useEffect(()=>{
    if(!logincontext.user){
      navigate("/login",{replace:true});
    }
  },[]);
  return (
  <>
    <div className="wrapper">
      <h1>Features</h1>
      <div className="img-area">
        <div className="single-img">
          <div className="img-content">
            <div className="front bg1">
              <div className="inner">
                <p>Account Details</p>
                {/* <span>Saving Account</span> */}
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <p>
                Get the details of your account.
                </p>
                <Link to="/details">
                  <button className="transaction-btn">check</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="single-img">
          <div className="img-content">
            <div className="front bg2">
              <div className="inner">
                <p>Mini Statement</p>
                {/* <span>Saving Account</span> */}
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <p>
                Get a list of the recent transactions performed by you.
                </p>
                <Link to="/ministatement">
                <button className="transaction-btn">Generate</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="single-img">
          <div className="img-content">
            <div className="front bg3">
              <div className="inner">
                <p>Cash withdrawal</p>
                {/* <span>Saving Account</span> */}
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <p>
                Withdraw money from your account.
                </p>
                <Link to="/cashwithdraw">
                <button className="transaction-btn">Withdraw</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="single-img">
          <div className="img-content">
            <div className="front bg4">
              <div className="inner">
                <p>Fund Transfer</p>
                {/* <span></span> */}
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <p>
                Transfer money from one account to another.
                </p>
                <Link to="/fundtransfer">
                <button className="transaction-btn">Transfer</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="foot">
        <Footer/>
      </div>
    </div>
    </>
  );
};

export default Transaction;
