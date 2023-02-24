const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const FormData = require('./models/dataSchema')
app.use(express.json())
app.use(cors());
mongoose.set('strictQuery',false);
mongoose.connect('mongodb+srv://admin:Hello12345@cluster0.lrb8jtc.mongodb.net/ticket?retryWrites=true&w=majority',{useNewUrlParser:true})

app.get('/api/all-event',(req,res)=>{
   FormData.find().then(result=>res.send(result)).catch(err=>console.log(err))
})

app.post('/api/event',async(req,res)=>{
    console.log(req.body);
    const EventName = req.body.EventName
    const Date = req.body.Date
    const Price = req.body.Price
    const Venue = req.body.Venue

    const formData = new FormData({
        EventName:EventName,
        Date:Date,
        Price:Price,
        Venue:Venue
    })
    try{
        await formData.save()
        res.send('data inserted')
    }catch(err){
        console.log(err)
    }
   
})

app.listen(4000,console.log('connected at port 4000'))