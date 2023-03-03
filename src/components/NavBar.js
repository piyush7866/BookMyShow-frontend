import React from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./Connector";
import { useEffect } from "react";
import TicketAbi from "../contracts/Ticket.json";
import { useDispatch } from "react-redux";
import { updateAbi } from "../reducer/state-reducer";
import CreateEvent from '../components/CreateEvent'

const Navbar = () => {
  const dispatch = useDispatch();

  const { active, account, library, activate, deactivate } =
    useWeb3React();

  // async function balanceFetch() {
  //   try {
  //     if (active) {
  //       console.log(library);
  //       const balance = await library.eth.getBalance(account);
  //       console.log(balance);
  //       const balanceToken = await library.utils.fromWei(balance);
  //       console.log(balanceToken);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  const ConnectInstance = async () => {
    console.log(library, "heelo");
    const networkID = await library.eth.net.getId();
    console.log(networkID, "check Network ID here")
    const networkData = TicketAbi.networks[networkID];
    console.log(networkData);
    const TicketInstance = await new library.eth.Contract(TicketAbi.abi, networkData.address);
    console.log(typeof TicketInstance, "check instance here");
    
    
    dispatch(updateAbi({
      TicketAbi: TicketInstance, 
      TicketContractAddress:networkData.address,
    }))  
  };

  useEffect(() => {
    if (active) {
      ConnectInstance();
    }
  }, [active]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href=" # ">
            Ticket booking app
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/event'>
                  CREATE EVENT
                </Link>
                <br></br>
                <Link to='/list'>
                  EVENT LIST
                </Link>
                <br></br>
                <Link to='/buy'>
                  BUY TICKET
                </Link>
                
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={connect}
            >
              Connect MetaMask
            </button>
            {active ? (
              <span>
              <b>{account}</b>
              </span>
            ) : (
              <span>Not connected</span>
            )}
             <button
              type="button"
              className="btn btn-secondary"
              onClick={disconnect}
            >
            Disconnect
            </button>  
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;