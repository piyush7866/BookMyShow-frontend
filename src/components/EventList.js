import React, { useEffect, useState } from 'react'
import axios from 'axios'
function EventList() {
  const [data,setData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:4000/api/all-event')
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
            {item.EventName} event is created at {item.Date} at location {item.Venue}
          </li>
          )
      }
    </ul>
    </>
    
  )
}

export default EventList