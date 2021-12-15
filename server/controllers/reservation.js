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