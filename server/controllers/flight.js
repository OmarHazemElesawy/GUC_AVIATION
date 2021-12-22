
import FlightData from '../models/flight.js';
export const getFlights = async(req,res)=>{
    try{
        const allFlights=await FlightData.find();
        res.status(200).json(allFlights);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};
export const createFlights = async (req,res)=>{
     //req from user
     const flight=req.body;
     //model..variable
     const newFlight= new FlightData(flight);
    try{
        await newFlight.save();
        res.status(201).json(newFlight);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}

export const deleteFlight = async (req,res)=>{
   const id =req.params.id;

   try{
       await FlightData.findByIdAndRemove(id).exec();
        res.send('Successfully deleted')
   }catch(error){
       console.log(error);
   }
}

export const updateFlight = async (req,res)=>{
    const id =req.params.id;
    try{
        await FlightData.findOneAndUpdate({_id:id},{
            flightNo:req.body.flightNo||FlightData.flightNo,
            departureTime:req.body.departureTime||FlightData.departureTime,
            arrivalTime:req.body.arrivalTime||FlightData.arrivalTime,
            ecoSeatNo:req.body.ecoSeatNo||FlightData.ecoSeatNo,
            businessSeatNo:req.body.businessSeatNo||FlightData.businessSeatNo,
            departureAirport:req.body.departureAirport||FlightData.departureAirport,
            arrivalAirport:req.body.arrivalAirport||FlightData.arrivalAirport,
            departureTerminal:req.body.departureTerminal||FlightData.departureTerminal,
            arrivalTerminal:req.body.arrivalTerminal||FlightData.arrivalTerminal,
        }).exec();
         res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }

