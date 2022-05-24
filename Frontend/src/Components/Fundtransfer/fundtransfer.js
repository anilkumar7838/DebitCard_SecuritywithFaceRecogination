import React, { useState } from "react";
import "./fundtransfer.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const Fundtransfer = () => {
    

    const [addFormData,setAddFormData] = useState({
      name:'',
      account:'',
      bankName:'',
      IFSC_Code:'',
      amount:''
    })

    const handleFormChange =(e)=>{
      e.preventDefault();
      const fieldName = e.target.getAttribute("name");
      const fieldValue = e.target.value;
      
      const newFormData = {...addFormData};
      newFormData[fieldName]=fieldValue;

      setAddFormData(newFormData);

    }
    
    const message = ()=>{
        toast.success(" Congratulation! Fund Transfer Successfully ", {position:"top-center"});
    }

  return (
    <div className="cash-main">
      <div className="cash-form">
        <h2>Fund Transfer</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum itaque
          ipsa dolor.
        </p>
        <form action="" onSubmit={(e)=>{
            e.preventDefault();
        }}>
          <input type="text" className="Amount" name="name" placeholder="Enter the Account holder Name" onChange={handleFormChange} required/>
          <input type="number" className="Amount" name="account" placeholder="Enter the Account Number" onChange={handleFormChange} required />
          <input type="text" className="Amount" name="bankName" placeholder="Enter the Bank Name" onChange={handleFormChange} required/>
          <input type="text" className="Amount" name="IFSC_Code" placeholder="Enter the IFSC Code" onChange={handleFormChange} required/>
          <input type="number" className="Amount" name="amount" placeholder="Enter the Amount" onChange={handleFormChange} required/>
          <input type="submit"  className="cash-btn" onClick={message} value="Confirm" />
        </form>
      </div>
    <ToastContainer/>
    </div>
  );
};

export default Fundtransfer