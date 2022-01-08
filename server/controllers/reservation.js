import ReservationData from '../models/reservation.js';

export const getReservation = async(req,res)=>{
    try{
        const allReservations=await ReservationData.find();
        res.status(200).json(allReservations);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};
export const createReservation1 = async (req,res)=>{
     //req from user
     const reservation=req.body;
     //model..variable
     const newReservation= new ReservationData(reservation);
    try{
        await newReservation.save();
        res.status(201).json(newReservation);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}
export const createReservation2 = async (req,res)=>{
    //req from user
    const reservation=req.body;
    //model..variable
    const newReservation= new ReservationData(reservation);
   try{
       await newReservation.save();
       res.status(201).json(newReservation);
   }catch(error){
       res.status(409).json({message:error.message});
   }
}

export const deleteReservation= async (req,res)=>{
    const id =req.params.id;
 
    try{
        await ReservationData.findByIdAndRemove(id).exec();
         res.send('Successfully deleted')
    }catch(error){
        console.log(error);
    }
 }
 export const updateReservation1 = async (req,res)=>{
    const id =req.params.id;
    try{
        await ReservationData.findOneAndUpdate({_id:id},{
            flightNo:req.body.flightNo||ReservationData.flightNo,
            flightID:req.body.flightID||ReservationData.flightID,
            date:req.body.date||ReservationData.date,
            departureTime:req.body.departureTime||ReservationData.departureTime,
            arrivalTime:req.body.arrivalTime||ReservationData.arrivalTime,
            departureAirport:req.body.departureAirport||ReservationData.departureAirport,
            arrivalAirport:req.body.arrivalAirport||ReservationData.arrivalAirport,
            departureTerminal:req.body.departureTerminal||ReservationData.departureTerminal,
            arrivalTerminal:req.body.arrivalTerminal||ReservationData.arrivalTerminal,
            tripDuration:req.body.tripDuration||ReservationData.tripDuration,
            allowance:req.body.allowance||ReservationData.allowance,
            price:req.body.price||ReservationData.price,
            class:req.body.class||ReservationData.class,
            confirmationCode:req.body.confirmationCode||ReservationData.confirmationCode,
            payed:req.body.payed||ReservationData.payed,
            depSeats:req.body.depSeats||ReservationData.depSeats,
            retSeats:req.body.retSeats||ReservationData.retSeats
        }).exec();
         res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }
 export const updateReservation2 = async (req,res)=>{
    const id =req.params.id;
    try{
        await ReservationData.findOneAndUpdate({_id:id},{
            flightNo:req.body.flightNo||ReservationData.flightNo,
            flightID:req.body.flightID||ReservationData.flightID,
            date:req.body.date||ReservationData.date,
            departureTime:req.body.departureTime||ReservationData.departureTime,
            arrivalTime:req.body.arrivalTime||ReservationData.arrivalTime,
            departureAirport:req.body.departureAirport||ReservationData.departureAirport,
            arrivalAirport:req.body.arrivalAirport||ReservationData.arrivalAirport,
            departureTerminal:req.body.departureTerminal||ReservationData.departureTerminal,
            arrivalTerminal:req.body.arrivalTerminal||ReservationData.arrivalTerminal,
            tripDuration:req.body.tripDuration||ReservationData.tripDuration,
            allowance:req.body.allowance||ReservationData.allowance,
            price:req.body.price||ReservationData.price,
            class:req.body.class||ReservationData.class,
            confirmationCode:req.body.confirmationCode||ReservationData.confirmationCode,
            payed:req.body.payed||ReservationData.payed,
            depSeats:req.body.depSeats||ReservationData.depSeats,
            retSeats:req.body.retSeats||ReservationData.retSeats
        }).exec();
         res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }