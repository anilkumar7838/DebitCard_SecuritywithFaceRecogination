import "./App.css";
import Home from "./Components/Home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginUi from './Components/Login/LoginUi';
import TransactionPanel from "./Components/Transaction/Transaction";
import { user, login, logout, LoginContext } from "./Components/Login/LoginContext";
import CustomerDetail from "./Components/customerDetails/customerDetail";
import Ministatement from "./Components/MiniStatement/miniStatement";
import Cashwithraw from "./Components/CashWithdrawal/cashwithraw";
import Fundtransfer from "./Components/Fundtransfer/fundtransfer.js";
import Loader from "./Components/Loader/Loader";


function App() {
  return (
    <>
    <LoginContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path="/login/:123" element={<TransactionPanel />} />
          <Route path="/login" element={<LoginUi />} />
          <Route path="/details" element={<CustomerDetail />} />
          <Route path="/ministatement" element={<Ministatement />} />
          <Route path="/cashwithdraw" element={<Cashwithraw />} />
          <Route path="/fundtransfer" element={<Fundtransfer/>} />
          <Route path="/" element={<Home />} />
          <Route path="/loader" element={<Loader/>} />

        </Routes>
      </Router>
      </LoginContext.Provider>
    </>
  );
}

export default App;
