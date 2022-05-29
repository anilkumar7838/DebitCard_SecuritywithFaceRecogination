import React, { useEffect, useState, useContext } from "react";
import "./customerDetail.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import LoginContext from "../Login/LoginContext";
import axios from "axios";

// -------------- Component : Customer Detail --------------
const formatDOB = (date)=>{
  let dt = new Date(date);
  return `${dt
    .getDate()
    .toLocaleString("en-Us", { minimumIntegerDigits: 2 })}/${dt
    .getMonth()
    .toLocaleString("en-Us", {
      minimumIntegerDigits: 2,
    })}/${dt.getFullYear()}`
}

const CustomerDetail = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginContext.user) {
      navigate("/login", { replace: true });
    }
    axios
      .get("/api/v1/user/details")
      .then((res) => {
        setUserDetails(res.data.user);
        setLoading(true);
      })
      .catch((err) => {
        loginContext.logout();
        navigate("/login", { replace: true });
      });
  }, []);
  return (
    <>
      {loading ? (
        userDetails ? (
          <div className="customer-main">
            <h1>Account Details</h1>
            <div className="mainBlock">
              <div className="top-detail">
                <div className="imgBox">
                  <img
                    src={`http://localhost:8000/media/${userDetails.Picture}`}
                    alt="userImage"
                  />
                </div>
                <div className="mainDetails">
                  <form>
                    <label>
                      <span>BankName:</span>
                      <input
                        type="text"
                        value={userDetails.BankName}
                        readOnly
                      />
                    </label>
                    <label>
                      <span>Branch:</span>
                      <input type="text" value={userDetails.Branch} readOnly />
                    </label>
                    <label>
                      <span>Email:</span>
                      <input type="Email" value={userDetails.Email} readOnly />
                    </label>
                    <label>
                      <span>Phone No.:</span>
                      <input
                        type="number"
                        value={userDetails.PhoneNumber}
                        readOnly
                      />
                    </label>
                  </form>
                </div>
              </div>

              <div className="bottom-detail">
                <form>
                  <label>
                    <span>FullName:</span>
                    <input
                      type="text"
                      value={userDetails.AccountHolderName}
                      readOnly
                    />
                  </label>
                  <label>
                    <span>S/D/H/O:</span>
                    <input
                      type="text"
                      value={userDetails.RelationField}
                      readOnly
                    />
                  </label>
                  <label>
                    <span>Account No.:</span>
                    <input
                      type="number"
                      value={userDetails.AccountNumber}
                      readOnly
                    />
                  </label>
                  <label>
                    <span>CIF Number:</span>
                    <input
                      type="number"
                      value={userDetails.CIFNumber}
                      readOnly
                    />
                  </label>
                  <label>
                    <span>MICR Number:</span>
                    <input
                      type="number"
                      value={userDetails.MICRNumber}
                      readOnly
                    />
                  </label>
                  <label>
                    <span>A/c Type:</span>
                    <input
                      type="text"
                      value={userDetails.AccountType}
                      readOnly
                    />
                  </label>
                  <label>
                    <span>Date of birth:</span>
                    <input type="text" value={formatDOB(userDetails.DOB)} readOnly />
                  </label>
                  <label>
                    <span>Address:</span>
                    <input type="text" value={userDetails.Address} readOnly />
                  </label>
                  <label>
                    <span>Email:</span>
                    <input type="email" value={userDetails.Email} readOnly />
                  </label>
                </form>
              </div>
            </div>
            <Link to="/transaction">
              <input type="submit" value="Back" />
            </Link>
          </div>
        ) : null
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CustomerDetail;
