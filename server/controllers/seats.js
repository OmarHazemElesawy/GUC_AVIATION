import SeatsData from '../models/seats.js';

export const getSeats = async(req,res)=>{
    try{
        const allSeats=await SeatsData.find();
        res.status(200).json(allSeats);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};

export const createSeats = async (req,res)=>{
     //req from user
     const seats=req.body;
     //model..variable
     const newSeats= new SeatsData(seats);
    try{
        await newSeats.save();
        res.status(201).json(newSeats);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updateSeats = async (req,res)=>{
    const id =req.params.id;
    try{
        await SeatsData.findOneAndUpdate({_id:id},{
            flightId:req.body.flightId||SeatsData.flightId,
            seatsBusiness:req.body.seatsBusiness||SeatsData.seatsBusiness,
            seatsEconomic:req.body.seatsEconomic||SeatsData.seatsEconomic,
            businessNo:req.body.businessNo||SeatsData.businessNo,
            economicNo:req.body.economicNo||SeatsData.economicNo
        }).exec();
        res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }