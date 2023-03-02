import React ,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateEvent(){
const [eventName,setEventName] = useState("");
const [date,setDate] = useState("");
const [price,setPrice] = useState(0);
const [totalTickets,setTotalTickets] = useState(0)
const [venue,setVenue] = useState("");
const [formData,setFormData] = useState([]);
const [eventId,setEventId] = useState(0);
const navigate = useNavigate()
const eventHandler = (e)=>{
    e.preventDefault();
    const data= {eventName,date,price,venue};
    setFormData(e=>[...e,data])
    axios.post('http://localhost:4001/api/event',{
      
            EventName:eventName,
            EventId:eventId,
            Date:date,
            Price:price,
            Venue:venue,
            TotalTicket:totalTickets
        
    }).then(res=>console.log(res)).catch(err=>console.log(err))
   
}

return <div className='card'>
    <h1>CREATE EVENT</h1>
    <div className='card-body'>
    <form method='POST' onSubmit={eventHandler}>
        <div className='mb-3'>
        <label className='form-label'>Event Name</label>
        <input type="text" className='form-control' value={eventName} onChange={e=>setEventName(e.target.value)}></input>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Event Id</label>
        <input type="number" className='form-control' value={eventId} onChange={e=>setEventId(e.target.value)}></input>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Date</label>
        <input type="text" className='form-control' value={date} onChange={e=>setDate(e.target.value)}></input>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Price</label>
        <input type="number" className='form-control' step="0.1" min="0" max="20" value={price} onChange={e=>setPrice(e.target.value)}></input>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Total Tickets</label>
        <input type="number" className='form-control' value={totalTickets} onChange={e=>setTotalTickets(e.target.value)}></input>
        </div>
        <div className='mb-3'>
        <label className='form-label'>Venue</label>
        <input type="text" className='form-control' value={venue} onChange={e=>setVenue(e.target.value)}></input>
        </div>
        <button type='submit' className='btn btn-primary btn-lg'>Create Event</button>
    </form>
    </div>
    <div className='card'>
        <div className='card-body'>
        <p>
        {
            formData.map(data=> {
                return <p>
                    {data.eventName} event is created on {data.date} at {data.venue}
                    <button onClick={()=>navigate('/list')} className="btn btn-secondary">View</button>
                </p>
            }
                )
        }
    </p>
        </div>
    </div>
    
</div>
}

export default CreateEvent