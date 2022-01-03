import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import flightRoutes from './routes/flight.js';
import reservationRoutes from './routes/reservation.js';
import userRoutes from './routes/user.js';
import dotenv from "dotenv"
import Stripe from 'stripe';
const app=express();
dotenv.config();
app.use(express.json({limit:"20mb", extended:true}));
app.use(express.urlencoded({limit:"20mb", extended:true}));

app.use(cors());
const stripe =Stripe(process.env.STRIPE_SECRET_TEST)

app.use('/flights',flightRoutes);
app.use('/reservations',reservationRoutes);
app.use('/users',userRoutes);
app.post('/payment',cors(), async(req,res)=>{
    let{amount,id}=req.body
    try{
        const payment=await stripe.paymentIntents.create({
            amount,
            currency:"egp",
            payment_method:id,
            description:"",
            confirm:true
        })
        console.log("payment",payment)
        res.json({
            message:"payment successful",
            success:true
        })
    }catch(error){
        console.log("error",error)
        res.json({
            message:"payment failed",
            successs:false
        })
    }
});

const CONNECTION_URL=
'mongodb+srv://vscode1357:vscode1357@cluster0.kxzfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>app.listen(PORT,()=>
    console.log(`connection is established  and running on port:${PORT}`)
)).catch((err)=> console.log(err.message));