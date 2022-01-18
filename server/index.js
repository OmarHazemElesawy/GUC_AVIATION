import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import flightRoutes from './routes/flight.js';
import reservationRoutes from './routes/reservation.js';
import userRouter from './routes/user.js';
import dotenv from "dotenv"
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";


const app=express();

dotenv.config();
app.use(express.json({limit:"20mb", extended:true}));
app.use(express.urlencoded({limit:"20mb", extended:true}));

app.use(cors());
const stripe =Stripe(process.env.STRIPE_SECRET_TEST)

app.use('/flights',flightRoutes);
app.use('/reservations',reservationRoutes);
app.use('/user',userRouter);


app.post('/payment',cors(), async(req,res)=>{
    let{amount,id}=req.body
    try{
        const payment=await stripe.paymentIntents.create({
            amount,
            currency:"eur",
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


app.post("/sendMail",cors(),async(req,res)=>
{
    let {subject1}=req.body
    let {subject2}=req.body
    let {text}=req.body
    let {email}=req.body
    let transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
    });
    await transport.sendMail({
        from:process.env.MAIL_USER,
        to:`${email}`,
        subject:`${subject1}`,
        html:`<div>
        <h3>Hello our Dear Customer</h3>
        <br/>
        <p>${subject2}</p>
        <br/>
        <p>${text}</p>
        <br/>
        <p>Thank you for using our services, Hope we see you soon</p>
        <p>Best regards,</p>
        <p>GUC Aviation</p>
        </div>`
    })
})

const CONNECTION_URL=
'mongodb+srv://vscode1357:vscode1357@cluster0.kxzfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>app.listen(PORT,()=>
    console.log(`connection is established  and running on port:${PORT}`)
)).catch((err)=> console.log(err.message));