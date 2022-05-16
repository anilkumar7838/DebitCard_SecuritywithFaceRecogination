import './App.css';
import Home from "./Components/Home/home";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import LoginUi from './Components/Login/LoginUi';
import TransactionPanel from "./Components/Transaction/Transaction";
function App() {
  return (
    <>
      <Router>
      <Routes>
      <Route path="/login/:id" element={<TransactionPanel/>}/>
        <Route path="/login" element = {<LoginUi/>}>
        </Route>
        <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
