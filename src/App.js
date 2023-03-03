import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from './components/NavBar';
import store from './reducer/store';

import "./App.css";
import CreateEvent from "./components/CreateEvent";
import EventList from "./components/EventList";
import BuyTicket from './components/BuyTicket';
import Login from "./components/Login";

function App() { 
   
 return (
  <Provider store={store}>
  <Router>
    <Routes>
    <Route path='/nav' element={<Navbar />} /> 
    <Route path='/' element={<Login />} /> 
    <Route path='/event' element={<CreateEvent />} /> 
    <Route path='/list' element={<EventList />} /> 
    <Route path='/buy' element={<BuyTicket />} /> 
    </Routes>
  </Router>
</Provider>  
);
}

export default App;