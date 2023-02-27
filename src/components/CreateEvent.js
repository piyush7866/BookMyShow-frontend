import React ,{useState} from 'react'
import axios from 'axios';
function CreateEvent(){
const [eventName,setEventName] = useState("");
const [date,setDate] = useState("");
const [price,setPrice] = useState(0);
const [totalTickets,setTotalTickets] = useState(0)
const [venue,setVenue] = useState("");
const [formData,setFormData] = useState([]);
const eventHandler = (e)=>{
    e.preventDefault();
    const data= {eventName,date,price,venue};
    setFormData(e=>[...e,data])
    axios.post('http://localhost:4000/api/event',{
      
            EventName:eventName,
            Date:date,
            Price:price,
            Venue:venue
        
    }).then(res=>console.log(res)).catch(err=>console.log(err))

    
    
}

return <div>
    <form method='POST' onSubmit={eventHandler}>
        <label>Event Name</label>
        <input type="text" value={eventName} onChange={e=>setEventName(e.target.value)}></input>
        <label>Date</label>
        <input type="text" value={date} onChange={e=>setDate(e.target.value)}></input>
        <label>Price</label>
        <input type="number" value={price} onChange={e=>setPrice(e.target.value)}></input>
        <label>Total Tickets</label>
        <input type="number" value={totalTickets} onChange={e=>setTotalTickets(e.target.value)}></input>
        <label>Venue</label>
        <input type="text" value={venue} onChange={e=>setVenue(e.target.value)}></input>
        <button type='submit'>Create Event</button>
    </form>
    <p>
        {
            formData.map(data=> {
                return <h1>
                    {data.eventName} event is created on {data.date} at {data.venue}
                </h1>
            }
                )
        }
    </p>
</div>
}

export default CreateEvent