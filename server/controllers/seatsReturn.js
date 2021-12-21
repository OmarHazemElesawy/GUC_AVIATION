import SeatsReturnData from '../models/seatsReturn.js';

export const getSeatsReturn = async(req,res)=>{
    try{
        const allSeatsReturn=await SeatsReturnData.find();
        res.status(200).json(allSeatsReturn);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};

export const createSeatsReturn = async (req,res)=>{
     //req from user
     const seatsReturn=req.body;
     //model..variable
     const newSeatsReturn= new SeatsReturnData(seatsReturn);
    try{
        await newSeatsReturn.save();
        res.status(201).json(newSeatsReturn);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updateSeatsReturn = async (req,res)=>{
    const id =req.params.id;
    try{
        await SeatsReturnData.findOneAndUpdate({_id:id},{
            flightId:req.body.flightId||SeatsReturnData.flightId,
            seatsBusiness:req.body.seatsBusiness||SeatsReturnData.seatsBusiness,
            seatsEconomic:req.body.seatsEconomic||SeatsReturnData.seatsEconomic,
        }).exec();
        res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }