import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import axios from 'axios'



const BuyTicket = () => {

  const {account , library} = useWeb3React();
  const TicketAbi = useSelector((state) => state.token.TicketAbi);
  const [eventName,setEventName] = useState("")
  const [quantity,setQuantity] = useState(0)
  const [data,setData] = useState([])
  const [eventId,setEventId] = useState(0)
  const handleOnChange = async (event)=>{
    event.preventDefault();
    data.map(async(item)=>{
      if (item.EventName==eventName){
        console.log(typeof item.Price);
        console.log(item.EventName)
        const price = parseInt(item.Price) * parseInt(quantity);
        console.log(price);
        const buyTicket = await TicketAbi.methods.buyNFT(parseInt(price),parseInt(quantity),eventId).send({
          from:account,
          value:library.utils.toWei(price.toString(),"ether"),
          gas:1000000
        })
 
        // const updatedTotalTickets = item.TotalTicket - quantity
        // axios.put(`http://localhost:4000/api/event:${updatedTotalTickets}`).then(result=>console.log(result)).catch(err=>console.log(err))
        console.log(buyTicket, "HERE BUYTICKETS");
      }
      
    })
   
  }

  const getDetails = async () => {
    const getValue = await TicketAbi.methods.getUserDetails(account).call({
      from: account,
    })
    console.log(getValue, "get user details here")
  }

  useEffect(()=>{
    axios.get('http://localhost:4001/api/all-event')
    .then((res)=>{
      console.log(res);
      setData(res.data);
    })
    getDetails();
  },[]) 

  return (
    <div>
      <h1>BUY TICKET</h1>
      <form>
        <div className="mb-3">
        <label className="form-label">Event Name</label>
          <input type="text" className="form-control" value={eventName} onChange={e=>setEventName(e.target.value)}></input>
        </div>
          <div className="mb-3">
          <label className="form-label">Number of Tickets</label>
          <input type="number" className="form-control" value={quantity} onChange={e=>setQuantity(e.target.value)}></input>
          </div>
          <div className="mb-3">
          <label className="form-label">Event Id</label>
          <input type="number" className="form-control" value={eventId} onChange={e=>setEventId(e.target.value)}></input>
          </div>
          <button onClick={handleOnChange} className="btn btn-primary btn-lg">
            buy 
          </button>
          </form>
    </div>
  )
}




export default BuyTicket;