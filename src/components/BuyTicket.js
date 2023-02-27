import { ethers } from "ethers";
import React, { useState,useEffect } from 'react'
import axios from 'axios'


function BuyTicket({state}) {
    const {contract} = state
    const [Data,setData] = useState([])
    const [quantity,setQuantity] = useState(0)
    const [date,setDate] = useState("")
    const [venue,setVenue] = useState("")
    const [eventName,setEventName] = useState("")

    const ticketHandler = async(event)=>{
      event.preventDefault(); 
      const amount = {
        value:ethers.utils.parseEther("0.00001")*quantity
      }
      Data.map(item=>{
        console.log(setDate(item.Date))
      })
      const unixDate = Math.floor(new Date(date).getTime() / 1000)
     const transaction = contract.createNFT("Blockchain",unixDate,amount,'Mumbai',quantity)
     await transaction.wait;
      console.log('Transaction done');
      console.log(date)
      console.log(contract)
    }
    useEffect(()=>{
      axios.get('http://localhost:4000/api/all-event')
      .then((res)=>{
        console.log(res);
        setData(res.data);
      })
    },[]) 
  return (
    <div>BuyTicket
      <form onSubmit={ticketHandler}>
        <label>Number of Tickets</label>
        <input value={quantity} onChange={e=>setQuantity(e.target.value)}></input>
        <button type='submit'>Buy</button>
      </form>
      <ul>
        {
          Data.map(item=>
            <li key={item.EventName}>
              {item.EventName} and {item.Date}
            </li>)
        }
      </ul>
    </div>
  )
}

export default BuyTicket