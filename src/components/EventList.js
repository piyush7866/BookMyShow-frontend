import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function EventList() {
  const [data,setData] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:4001/api/all-event')
    .then((res)=>{
      console.log(res);
      setData(res.data);
    })
  },[]) 
  return (
    <>
    <div>EventList</div>
    <ul>
      {
        data.map(item=>
          <li key={item._id}>
            {item.EventName} event is created at {item.Date} at location {item.Venue} {" "}
            <button onClick={()=>navigate('/buy')} className="btn btn-secondary btn-lg">Buy</button>
            <hr></hr>
            
          </li>
          ) 
      }
      
    </ul>
   
    </>
    
  )
}

export default EventList