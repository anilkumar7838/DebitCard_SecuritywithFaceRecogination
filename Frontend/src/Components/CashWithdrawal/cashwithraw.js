import React from "react";
import "./cashwithdraw.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContext from "../Login/LoginContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// --------------- Component: cash withdraw -------------

const Cashwithraw = () => {
  const logincontext = React.useContext(LoginContext);
  const [amount, setAmount] = React.useState(0);

  const navigate = useNavigate();

  // ------- Notify using React-toastify --------- 
  const notify = (message, type = null) => {
    if (!type) {
      toast(message, { position: "top-center" });
    } else if (type === "error") {
      toast.error(message, { position: "top-center" });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 2 * 60 * 1000,
      });
    }
  }
    const handleSubmit = (e)=>{
      e.preventDefault();
      axios.post("/api/v1/withdraw",{Amount:amount}).then((res)=>{
        notify(`Transaction Successful. Your Transaction Id is ${res.data.transaction_id}`,"success");
      })
      .catch((err)=>{
        notify(err.response.data.message,"error");
      })
  };


  React.useEffect(() => {
    if (!logincontext.user) {
      logincontext.logout();
      navigate("/login", { replace: true });
    }
  });
  
  return (
    <div className="cash-main">
      <div className="cash-form">
        <h2>Cash Withdraw</h2>
        <p>
        Fill the details below to withdraw money from your account.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            className="Amount"
            name="amount"
            placeholder="Enter the Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        <input type="submit" className="cash-btn" value="Confirm" />
        <Link to="/transaction">
          <input type="button" className="cash-btn" value="Back" />
        </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Cashwithraw;
