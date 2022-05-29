import "./App.css";
import Home from "./Components/Home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginUi from './Components/Login/LoginUi';
import TransactionPanel from "./Components/Transaction/Transaction";
import {LoginState} from "./Components/Login/LoginContext";
import CustomerDetail from "./Components/customerDetails/customerDetail";
import Ministatement from "./Components/MiniStatement/miniStatement";
import Cashwithraw from "./Components/CashWithdrawal/cashwithraw";
import Fundtransfer from "./Components/Fundtransfer/fundtransfer.js";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Header/header";
// import ImageSlider from './Components/Imageslider/imageslider.js';
// import { SliderData } from './Components/Imageslider/SliderData';


// ------------------ Routes---------------------

function App() {
  return (
    <>
    <LoginState>
      <Router>
      <Header/>
        <Routes>
          <Route path="/transaction" element={<TransactionPanel />} />
          <Route path="/login" element={<LoginUi />} />
          <Route path="/details" element={<CustomerDetail />} />
          <Route path="/ministatement" element={<Ministatement />} />
          <Route path="/cashwithdraw" element={<Cashwithraw />} />
          <Route path="/fundtransfer" element={<Fundtransfer/>} />
          <Route path="/" element={<Home />} />
          <Route path="/loader" element={<Loader/>} />
        </Routes>
      </Router>
      </LoginState>
    </>
  );
}

export default App;
