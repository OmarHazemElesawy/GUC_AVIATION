import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import flightRoutes from './routes/flight.js';
import reservationRoutes from './routes/reservation.js';
import userRoutes from './routes/user.js';
import seatsDepartureRoutes from './routes/seatsDeparture.js';
import seatsReturnRoutes from './routes/seatsReturn.js';

const app=express();

app.use(express.json({limit:"20mb", extended:true}));
app.use(express.urlencoded({limit:"20mb", extended:true}));

app.use(cors());

app.use('/flights',flightRoutes);
app.use('/reservations',reservationRoutes);
app.use('/users',userRoutes);
app.use('/seatsDeparture',seatsDepartureRoutes);
app.use('/seatsReturn',seatsReturnRoutes);

const CONNECTION_URL=
'mongodb+srv://vscode1357:vscode1357@cluster0.kxzfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>app.listen(PORT,()=>
    console.log(`connection is established  and running on port:${PORT}`)
)).catch((err)=> console.log(err.message));