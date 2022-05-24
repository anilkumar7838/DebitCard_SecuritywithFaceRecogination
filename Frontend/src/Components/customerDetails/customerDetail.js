import React from "react";
import "./customerDetail.css";
import {Link} from "react-router-dom";
import userImage from "../../Images/AnilProfile.jpeg";

const CustomerDetail = () => {
  return (<>
    <div className="customer-main">
      <h1>
        Account Details
      </h1>
      <div className="mainBlock">
        <div className="top-detail">
          <div className="imgBox">
            <img src={userImage} alt="userImage" />
          </div>
          <div className="mainDetails">
            <form>
              <label>
              <span>BankName:</span>
              <input type="text" value="SBI" readOnly/>
              </label>
              <label>
              <span>Branch:</span>
              <input type="text" value="NSIT
              Dwark sec-3 ,New Delhi"readOnly/>
              </label>
              <label>
              <span>Email:</span>
              <input type="Email" 
              value="sbi.10532@sbi.co.in" readOnly/>
              </label>
              <label>
              <span>Phone No.:</span>
              <input type="number" value="25099230" readOnly/>
              </label>
            </form>
          </div>
        </div>

        <div className="bottom-detail">
          <form>
            <label>
              <span>FullName:</span>
              <input type="text" value="Rohan Das" readOnly />
            </label>
            <label>
              <span>S/D/H/O:</span>
              <input type="text" value="Mohan Das" readOnly />
            </label>
            <label>
              <span>Account No.:</span>
              <input type="number" value="2345678998" readOnly />
            </label>
            <label>
              <span>CIF Number:</span>
              <input type="number" value="9078655433" readOnly />
            </label>
            <label>
              <span>MICR Number:</span>
              <input type="number" value="110005433" readOnly />
            </label>
            <label>
              <span>A/c Type:</span>
              <input type="text" value="Regular Saving Bank Acount" readOnly />
            </label>
            <label>
              <span>Date of birth:</span>
              <input type="text" value="13-09-2001" readOnly />
            </label>
            <label>
              <span>Address:</span>
              <input type="text" value="RZ/G-2 Nanda block Mahavir Enclave,Palam Village" readOnly />
            </label>
            <label>
              <span>Email:</span>
              <input type="email" value="akreal7838@gmail.com" readOnly />
            </label>
          </form>
        </div>
      </div>
      <Link to="/login/:123">
        <input type="submit" value="Back" />
      </Link>
    </div>
    </>
  );
};

export default CustomerDetail;
