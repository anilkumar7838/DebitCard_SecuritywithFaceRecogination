import React, { useState } from "react";
import "./fundtransfer.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginContext from "../Login/LoginContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Fundtransfer = () => {

  const logincontext = React.useContext(LoginContext);
  const [addFormData, setAddFormData] = useState({
    AccountHolderName: '',
    AccountNumber: '',
    BankName: '',
    IFSC_code: '',
    Amount: ''
  })

  const handleFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);

  }
  const navigate = useNavigate();
  const notify = (message, type = null) => {
    if (!type) {
      toast(message, { position: "top-center" });
    }
    else if (type === "error") {
      toast.error(message, { position: "top-center" });
    }
    else {
      toast.success(message, { position: "top-center", autoClose: 2 * 60 * 1000 });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/v1/fundtransfer", addFormData).then((res) => {
      notify(`Transaction Successful. Your Transaction Id is ${res.data.transaction_id}`, "success");
    })
      .catch((err) => {
        notify(err.response.data.message, "error");
      })
  }

  React.useEffect(() => {
    if (!logincontext.user) {
      logincontext.logout();
      navigate("/login", { replace: true });
    }
  })

  return (
    <div className="fund-main">
      <div className="fund-form">
        <h2>Fund Transfer</h2>
        <p>
        Fill the details below to transfer money from one account to another.
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" className="Amount" name="AccountHolderName" placeholder="Enter the Account holder Name" onChange={handleFormChange} required />
          <input type="number" className="Amount" name="AccountNumber" placeholder="Enter the Account Number" onChange={handleFormChange} required />
          <input type="text" className="Amount" name="BankName" placeholder="Enter the Bank Name" onChange={handleFormChange} required />
          <input type="text" className="Amount" name="IFSC_code" placeholder="Enter the IFSC Code" onChange={handleFormChange} required />
          <input type="number" className="Amount" name="Amount" placeholder="Enter the Amount" onChange={handleFormChange} required />
          <input type="submit" className="fund-btn" value="Confirm" />
        </form>
        <Link to="/transaction">
          <input type="button" className="fund-btn" value="Back" />
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Fundtransfer