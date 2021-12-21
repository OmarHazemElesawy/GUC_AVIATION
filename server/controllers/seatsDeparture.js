import SeatsDepartureData from '../models/seatsDeparture.js';

export const getSeatsDeparture = async(req,res)=>{
    try{
        const allSeatsDeparture=await SeatsDepartureData.find();
        res.status(200).json(allSeatsDeparture);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};

export const createSeatsDeparture = async (req,res)=>{
     //req from user
     const seatsDeparture=req.body;
     //model..variable
     const newSeatsDeparture= new SeatsDepartureData(seatsDeparture);
    try{
        await newSeatsDeparture.save();
        res.status(201).json(newSeatsDeparture);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updateSeatsDeparture = async (req,res)=>{
    const id =req.params.id;
    try{
        await SeatsDepartureData.findOneAndUpdate({_id:id},{
            flightId:req.body.flightId||SeatsDepartureData.flightId,
            seatsBusiness:req.body.seatsBusiness||SeatsDepartureData.seatsBusiness,
            seatsEconomic:req.body.seatsEconomic||SeatsDepartureData.seatsEconomic,
        }).exec();
        res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }