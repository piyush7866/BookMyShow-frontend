import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ethers} from 'ethers'
import { useState,useEffect } from "react";
import CreateEvent from "./components/CreateEvent";
import Login from "./components/Login";
import "./App.css";
import EventList from "./components/EventList";
import BuyTicket from "./components/BuyTicket";
import abi from "./contract/Ticket.json";
function App() { 
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
      });
      const [account, setAccount] = useState("None");
      
    
      useEffect(() => {
        const connectWallet = async () => {
          const contractAddress = "0x502A830C403a0368e96fbb2A5A50fe1c56AF703e";
          const contractABI = abi.abi;
          try {
            const { ethereum } = window;
    
            if (ethereum) {
              const account = await ethereum.request({
                method: "eth_requestAccounts",
              });
    
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
              );
              setAccount(account);
              setState({ provider, signer, contract });
            } else {
              alert("Please install metamask");
            }
          } catch (error) {
            console.log(error);
          }
        };
        connectWallet();
      }, [account]);
 return <div>
 <Router>
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path = '/event' element={<CreateEvent />} />
  <Route path = '/list' element={<EventList />} />
  <Route path = '/buy' element={<BuyTicket state={state} />} />
  </Routes>
 </Router>
 </div>
}

export default App;